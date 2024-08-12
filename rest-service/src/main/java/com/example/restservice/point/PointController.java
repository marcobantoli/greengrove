package com.example.restservice.point;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/points")
public class PointController {

    private final PointService pointService;

    @Autowired
    public PointController(PointService pointService) {
        this.pointService = pointService;
    }

    @GetMapping
    public List<Point> getAllPoints() {
        return pointService.getAllPoints();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Point> getPointById(@PathVariable UUID id) {
        Point point = pointService.getPointById(id);
        return point != null ? ResponseEntity.ok(point) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Point> createPoint(@RequestBody Point point) {
        Point createdPoint = pointService.createPoint(point);
        return ResponseEntity.ok(createdPoint);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Point> updatePoint(@PathVariable UUID id, @RequestBody Point pointDetails) {
        Point updatedPoint = pointService.updatePoint(id, pointDetails);
        return updatedPoint != null ? ResponseEntity.ok(updatedPoint) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoint(@PathVariable UUID id) {
        pointService.deletePoint(id);
        return ResponseEntity.noContent().build();
    }
}
