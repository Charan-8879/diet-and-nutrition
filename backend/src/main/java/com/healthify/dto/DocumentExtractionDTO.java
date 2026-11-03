package com.healthify.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DocumentExtractionDTO {
    private String documentName;
    private String doctorTrainerNotes;
    private Double targetCalories;
    private Double proteinTarget;
    private Double carbsTarget;
    private Double fatTarget;
    private Double fibreTarget;
    private List<String> extractedFoods = new ArrayList<>();
    private List<ExtractedFoodDetailDTO> detailedFoods = new ArrayList<>();
    private List<Map<String, Object>> suggestedMeals = new ArrayList<>();
    private List<String> unclearOrMissingInfo = new ArrayList<>();

    public DocumentExtractionDTO() {}

    public String getDocumentName() { return documentName; }
    public void setDocumentName(String documentName) { this.documentName = documentName; }

    public String getDoctorTrainerNotes() { return doctorTrainerNotes; }
    public void setDoctorTrainerNotes(String doctorTrainerNotes) { this.doctorTrainerNotes = doctorTrainerNotes; }

    public Double getTargetCalories() { return targetCalories; }
    public void setTargetCalories(Double targetCalories) { this.targetCalories = targetCalories; }

    public Double getProteinTarget() { return proteinTarget; }
    public void setProteinTarget(Double proteinTarget) { this.proteinTarget = proteinTarget; }

    public Double getCarbsTarget() { return carbsTarget; }
    public void setCarbsTarget(Double carbsTarget) { this.carbsTarget = carbsTarget; }

    public Double getFatTarget() { return fatTarget; }
    public void setFatTarget(Double fatTarget) { this.fatTarget = fatTarget; }

    public Double getFibreTarget() { return fibreTarget; }
    public void setFibreTarget(Double fibreTarget) { this.fibreTarget = fibreTarget; }

    public List<String> getExtractedFoods() { return extractedFoods; }
    public void setExtractedFoods(List<String> extractedFoods) { this.extractedFoods = extractedFoods; }

    public List<ExtractedFoodDetailDTO> getDetailedFoods() { return detailedFoods; }
    public void setDetailedFoods(List<ExtractedFoodDetailDTO> detailedFoods) { this.detailedFoods = detailedFoods; }

    public List<Map<String, Object>> getSuggestedMeals() { return suggestedMeals; }
    public void setSuggestedMeals(List<Map<String, Object>> suggestedMeals) { this.suggestedMeals = suggestedMeals; }

    public List<String> getUnclearOrMissingInfo() { return unclearOrMissingInfo; }
    public void setUnclearOrMissingInfo(List<String> unclearOrMissingInfo) { this.unclearOrMissingInfo = unclearOrMissingInfo; }
}

