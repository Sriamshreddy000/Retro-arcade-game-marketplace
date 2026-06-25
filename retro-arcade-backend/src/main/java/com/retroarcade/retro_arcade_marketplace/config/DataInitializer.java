package com.retroarcade.retro_arcade_marketplace.config;

import com.retroarcade.retro_arcade_marketplace.model.Game;
import com.retroarcade.retro_arcade_marketplace.repository.GameRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initGames(GameRepository gameRepository) {
        return args -> {
            if (gameRepository.count() == 0) {
                Game pacman = new Game();
                pacman.setTitle("Pac-Man");
                pacman.setDescription("Classic arcade maze game");
                pacman.setPrice(29.99);
                pacman.setImageUrl("https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDd6eWJwdXc5cWlkcWxvaWQ3ZmpnMTZ0MWlreTBucXZubjE1dnA0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hkqefnFjn2MWVl6xvq/giphy.gif");

                Game galaga = new Game();
                galaga.setTitle("Galaga");
                galaga.setDescription("Space shooter arcade game");
                galaga.setPrice(24.99);
                galaga.setImageUrl("https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDdlNjJwYnd1MzVqeGRvOGs3YXJzbHliMGJudnpqbzJ0bDMyZ3J5NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uYe2emzPgDfj2/giphy.gif");

                Game donkeyKong = new Game();
                donkeyKong.setTitle("Donkey Kong");
                donkeyKong.setDescription("Platform game with barrels and jumping");
                donkeyKong.setPrice(19.99);
                donkeyKong.setImageUrl("https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDAxZ3cwNzZrdWZ5OGtxYjVtYWRuendoOGdxZ3E0ejR5NGpnNGYxaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a3unaScYmrFGE/giphy.gif");

                gameRepository.saveAll(List.of(pacman, galaga, donkeyKong));

                System.out.println("✅ Sample games inserted!");
            }
        };
    }
}
