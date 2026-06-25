package com.retroarcade.retro_arcade_marketplace.service;

import com.retroarcade.retro_arcade_marketplace.model.Game;
import com.retroarcade.retro_arcade_marketplace.repository.GameRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {
    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game addGame(Game game) {
        return gameRepository.save(game);
    }

    public Game getGameById(Long id) {
        return gameRepository.findById(id).orElse(null);
    }
}