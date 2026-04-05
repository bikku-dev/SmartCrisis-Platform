package com.crises.app;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import reactor.core.publisher.Flux;

import java.util.*;
import java.util.stream.Collectors;
@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public ReactiveJwtAuthenticationConverter jwtAuthenticationConverter() {

        ReactiveJwtAuthenticationConverter converter = new ReactiveJwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(jwt -> {

            List<SimpleGrantedAuthority> authorities = new ArrayList<>();

            // ✅ Realm roles
            Map<String, Object> realmAccess = jwt.getClaim("realm_access");

            if (realmAccess != null && realmAccess.get("roles") != null) {
                List<String> roles = (List<String>) realmAccess.get("roles");

                authorities.addAll(
                        roles.stream()
                                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                                .toList()
                );
            }

            // ✅ Client roles
            Map<String, Object> resourceAccess = jwt.getClaim("resource_access");

            if (resourceAccess != null) {
                Map<String, Object> client = (Map<String, Object>) resourceAccess.get("spring-client");

                if (client != null && client.get("roles") != null) {
                    List<String> clientRoles = (List<String>) client.get("roles");

                    authorities.addAll(
                            clientRoles.stream()
                                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                                    .toList()
                    );
                }
            }

            return Flux.fromIterable(authorities);
        });

        return converter;
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {

        return http
                .csrf(csrf -> csrf.disable())

                .authorizeExchange(exchange -> exchange

                        // ✅ Public APIs (no auth)
                        .pathMatchers("/public/**").permitAll()

                        // 🔐 CORE SERVICE (secured)
                        .pathMatchers("/core/**")
                        .hasAnyRole("USER", "ADMIN", "HOSPITAL")

                        // 🔐 LOCATION SERVICE
                        .pathMatchers("/location/**")
                        .hasAnyRole("VOLUNTEER", "ADMIN", "USER", "HOSPITAL")

                        // 🔐 ADMIN APIs
                        .pathMatchers("/admin/**")
                        .hasRole("ADMIN")

                        .pathMatchers("/ai/**")
                        .hasAnyRole("USER","ADMIN")

                        // 🔒 Baaki sab authenticated hona chahiye
                        .anyExchange().authenticated()
                )

                // 🔑 Keycloak JWT validation
                .oauth2ResourceServer(oauth -> oauth
                        .jwt(jwt -> jwt
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())
                        )
                )

                .build();
    }
}