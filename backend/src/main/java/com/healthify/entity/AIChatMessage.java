package com.healthify.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_chat_messages")
public class AIChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(nullable = false, length = 10)
    private String sender; // "user" or "bot"

    @Lob
    @Column(name = "message_text", columnDefinition = "MEDIUMTEXT", nullable = false)
    private String messageText;

    @Column(length = 50)
    private String source = "groq";

    @Column(name = "diet_plan_id")
    private Long dietPlanId;

    @Column(name = "attachment_name", length = 255)
    private String attachmentName;

    @Column(name = "attachment_type", length = 100)
    private String attachmentType;

    @Column(name = "has_attachment")
    private Boolean hasAttachment = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public AIChatMessage() {}

    public AIChatMessage(User user, String sender, String messageText, String source, Long dietPlanId, String attachmentName, String attachmentType, Boolean hasAttachment) {
        this.user = user;
        this.sender = sender;
        this.messageText = messageText;
        this.source = source != null ? source : "groq";
        this.dietPlanId = dietPlanId;
        this.attachmentName = attachmentName;
        this.attachmentType = attachmentType;
        this.hasAttachment = hasAttachment != null ? hasAttachment : false;
        this.createdAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getMessageText() { return messageText; }
    public void setMessageText(String messageText) { this.messageText = messageText; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public Long getDietPlanId() { return dietPlanId; }
    public void setDietPlanId(Long dietPlanId) { this.dietPlanId = dietPlanId; }

    public String getAttachmentName() { return attachmentName; }
    public void setAttachmentName(String attachmentName) { this.attachmentName = attachmentName; }

    public String getAttachmentType() { return attachmentType; }
    public void setAttachmentType(String attachmentType) { this.attachmentType = attachmentType; }

    public Boolean getHasAttachment() { return hasAttachment; }
    public void setHasAttachment(Boolean hasAttachment) { this.hasAttachment = hasAttachment; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

