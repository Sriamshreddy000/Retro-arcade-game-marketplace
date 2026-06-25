package com.retroarcade.retro_arcade_marketplace.config;

import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.OAuthTokenCredential;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class PayPalConfig {

    private static final String CLIENT_ID = "AXVychApK-LGtEmJxpGuuDCxsARkaBw8TPQQtMwoy0m2aU5yFXfxOdG7DojEdVzOE7RNlMZWXv-YMwZN";
    private static final String CLIENT_SECRET = "EFyex_VAYLlts-YbItO5V8abgAlhdUgRM7bieuSQel5hYWHnSDJmntI4xOaLIlfEiapGCUIzDTDEnR8X";
    private static final String MODE = "sandbox"; // or "live"

    @Bean
    public Map<String, String> paypalSdkConfig() {
        Map<String, String> configMap = new HashMap<>();
        configMap.put("mode", MODE);
        return configMap;
    }

    @Bean
    public OAuthTokenCredential authTokenCredential() {
        return new OAuthTokenCredential(CLIENT_ID, CLIENT_SECRET, paypalSdkConfig());
    }

    @Bean
    public APIContext apiContext() throws PayPalRESTException {
        APIContext context = new APIContext(authTokenCredential().getAccessToken());
        context.setConfigurationMap(paypalSdkConfig());
        return context;
    }
}
