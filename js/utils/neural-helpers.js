// Helper functions for brain generation
class NeuralHelpers {
    static generateNodeId(type) {
        return `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    static calculateConnectionStrength(source, target) {
        // Simple strength calculation based on emotional similarity
        const emotionalOverlap = this.calculateEmotionalOverlap(
            source.emotional_impact, 
            target.emotional_impact
        );
        return Math.min(1, emotionalOverlap * 1.5);
    }

    static calculateEmotionalOverlap(emotions1, emotions2) {
        let overlap = 0;
        let total = 0;
        
        for (const emotion in emotions1) {
            if (emotions2[emotion]) {
                overlap += Math.min(emotions1[emotion], emotions2[emotion]);
                total += Math.max(emotions1[emotion], emotions2[emotion]);
            }
        }
        
        return total > 0 ? overlap / total : 0;
    }

    static estimateAgeFromText(text) {
        // Simple age estimation from text content
        const ageIndicators = {
            'child': 8,
            'teen': 15,
            'adult': 25,
            'young': 20,
            'old': 45
        };
        
        const lowerText = text.toLowerCase();
        for (const [indicator, age] of Object.entries(ageIndicators)) {
            if (lowerText.includes(indicator)) {
                return age;
            }
        }
        
        return 15; // Default age
    }
}
