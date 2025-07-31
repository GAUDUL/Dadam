package com.example.backend.domain.listening.word;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WordRepository extends JpaRepository<Word, Integer> {

    @Query(value="Select * FROM words ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<Word> findRandomWords(@Param("count")int count);

    @Query(value="SELECT * FROM words WHERE id <> :excludeId ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<Word> findRandomWordsExcludeId(@Param("excludeId")int excludeId, @Param("count") int count);
}
