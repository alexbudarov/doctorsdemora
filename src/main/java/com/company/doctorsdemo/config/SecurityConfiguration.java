package com.company.doctorsdemo.config;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import com.amplicode.core.auth.UserDetailsAuthenticationInfoProvider;
import com.amplicode.core.security.UnauthorizedStatusAuthenticationEntryPoint;
import com.amplicode.core.security.formlogin.FormLoginAuthenticationFailureHandler;
import com.amplicode.core.security.formlogin.FormLoginAuthenticationSuccessHandler;
import com.amplicode.core.security.formlogin.FormLoginLogoutSuccessHandler;
import jakarta.servlet.DispatcherType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests
                .requestMatchers("/", "/index.html", "/assets/**").permitAll()
                .requestMatchers("/graphql/**").permitAll()
                .requestMatchers("/graphql").permitAll()
                .requestMatchers("/api/addon/**").authenticated()
                .dispatcherTypeMatchers(DispatcherType.FORWARD, DispatcherType.ERROR).permitAll());
        http.headers(Customizer.withDefaults());
        http.sessionManagement(Customizer.withDefaults());
        http.exceptionHandling(exceptionHandling -> exceptionHandling
                .authenticationEntryPoint(authenticationEntryPoint()));
        http.formLogin(formLogin -> formLogin
                .successHandler(formLoginAuthenticationSuccessHandler())
                .failureHandler(formLoginAuthenticationFailureHandler()));
        http.logout(logout -> logout
                .logoutSuccessHandler(logoutSuccessHandler()));
        http.anonymous(Customizer.withDefaults());
        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public AuthenticationInfoProvider authenticationInfoProvider() {
        return new UserDetailsAuthenticationInfoProvider();
    }

    @Bean
    AuthenticationEntryPoint authenticationEntryPoint() {
        return new UnauthorizedStatusAuthenticationEntryPoint();
    }

    @Bean
    FormLoginAuthenticationSuccessHandler formLoginAuthenticationSuccessHandler() {
        return new FormLoginAuthenticationSuccessHandler();
    }

    @Bean
    FormLoginAuthenticationFailureHandler formLoginAuthenticationFailureHandler() {
        return new FormLoginAuthenticationFailureHandler();
    }

    @Bean
    LogoutSuccessHandler logoutSuccessHandler() {
        return new FormLoginLogoutSuccessHandler();
    }
}