package com.retroarcade.retro_arcade_marketplace.repository;

import com.retroarcade.retro_arcade_marketplace.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}