package com.example.restservice.point;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PointService {

    private final PointRepository pointRepository;

    @Autowired
    public PointService(PointRepository pointRepository) {
        this.pointRepository = pointRepository;
    }

    public List<Point> getAllPoints() {
        return pointRepository.findAll();
    }

    public Point getPointById(UUID pointId) {
        return pointRepository.findById(pointId).orElse(null);
    }

    public Point createPoint(Point point) {
        // Set the earnedAt timestamp
        point.setEarnedAt(new java.util.Date());
        return pointRepository.save(point);
    }

    public Point updatePoint(UUID pointId, Point pointDetails) {
        return pointRepository.findById(pointId)
                .map(point -> {
                    point.setUser(pointDetails.getUser());
                    point.setEvent(pointDetails.getEvent());
                    point.setPoints(pointDetails.getPoints());
                    // Update the earnedAt timestamp
                    point.setEarnedAt(new java.util.Date());
                    return pointRepository.save(point);
                })
                .orElse(null);
    }

    public void deletePoint(UUID pointId) {
        pointRepository.deleteById(pointId);
    }
}
