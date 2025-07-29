package com.ome.controller.qna;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.ome.dto.qna.request.QuestionRequestDto;
import com.ome.dto.qna.response.QuestionResponseDto;
import com.ome.service.auth.CustomUserDetails;
import com.ome.service.qna.QuestionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/qna/questions")
@RequiredArgsConstructor
public class QuestionController {

	private final QuestionService questionService;
	
	@PostMapping
	public ResponseEntity<String> createQuestion(@RequestBody QuestionRequestDto requestDto,
												 @AuthenticationPrincipal CustomUserDetails user){
		return ResponseEntity.ok(questionService.createQuestion(requestDto, user.getUser()));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<QuestionResponseDto> getQuestion(@PathVariable Long id, 
														   @AuthenticationPrincipal CustomUserDetails user){
		return ResponseEntity.ok(questionService.getQuestion(id, user.getId()));
	}
	
	@GetMapping
	public ResponseEntity<Page<QuestionResponseDto>> getAllQuestion(@RequestParam Long recipeId,
																	@RequestParam(defaultValue = "0") int page,
																	@RequestParam(defaultValue = "10") int size){
		return ResponseEntity.ok(questionService.getAllQuestion(recipeId, page, size));
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<String> updateQuestion(@PathVariable Long id,
												 @RequestBody QuestionRequestDto requestDto,
												 @AuthenticationPrincipal CustomUserDetails user){
		return ResponseEntity.ok(questionService.updateQuestion(id, requestDto, user.getId()));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteQuestion(@PathVariable Long id,
												 @AuthenticationPrincipal CustomUserDetails user){
		return ResponseEntity.ok(questionService.deleteQuestion(id, user.getId()));
	}
}
