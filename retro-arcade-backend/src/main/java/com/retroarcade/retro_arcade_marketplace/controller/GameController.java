package com.retroarcade.retro_arcade_marketplace.controller;

import com.retroarcade.retro_arcade_marketplace.model.Game;
import com.retroarcade.retro_arcade_marketplace.service.GameService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {
    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @PostMapping
    public Game addGame(@RequestBody Game game) {
        return gameService.addGame(game);
    }

    @GetMapping("/{id}")
    public Game getGameById(@PathVariable Long id) {
        return gameService.getGameById(id);
    }
}