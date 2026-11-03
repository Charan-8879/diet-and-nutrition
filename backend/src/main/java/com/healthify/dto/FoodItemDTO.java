package com.healthify.dto;

public class FoodItemDTO {
    private Long id;
    private String name;
    private Double grams;
    private Double cal;
    private Double protein;
    private Double fibre;
    private String type;
    private String date;

    public FoodItemDTO() {}

    public FoodItemDTO(Long id, String name, Double grams, Double cal, Double protein, Double fibre, String type, String date) {
        this.id = id;
        this.name = name;
        this.grams = grams;
        this.cal = cal;
        this.protein = protein;
        this.fibre = fibre;
        this.type = type;
        this.date = date;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getGrams() { return grams; }
    public void setGrams(Double grams) { this.grams = grams; }

    public Double getCal() { return cal; }
    public void setCal(Double cal) { this.cal = cal; }

    public Double getProtein() { return protein; }
    public void setProtein(Double protein) { this.protein = protein; }

    public Double getFibre() { return fibre; }
    public void setFibre(Double fibre) { this.fibre = fibre; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}
