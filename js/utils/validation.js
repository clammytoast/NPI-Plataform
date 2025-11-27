// Validation for NPI brain structure
class NPIValidator {
    static validateBrain(brain) {
        const errors = [];
        
        // Check required top-level fields
        if (!brain.npi_spec_version) errors.push('Missing npi_spec_version');
        if (!brain.metadata) errors.push('Missing metadata');
        if (!brain.brain_architecture) errors.push('Missing brain_architecture');
        
        // Validate metadata
        if (brain.metadata) {
            if (!brain.metadata.name) errors.push('Missing metadata.name');
            if (!brain.metadata.created_date) errors.push('Missing metadata.created_date');
        }
        
        // Validate neural network
        if (brain.brain_architecture && brain.brain_architecture.neural_network) {
            const nn = brain.brain_architecture.neural_network;
            if (!nn.nodes) errors.push('Missing neural_network.nodes');
            if (!nn.connections) errors.push('Missing neural_network.connections');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
    
    static validateNode(node) {
        const errors = [];
        const required = ['id', 'type', 'content', 'position'];
        
        required.forEach(field => {
            if (!node[field]) errors.push(`Node missing required field: ${field}`);
        });
        
        // Validate position array
        if (node.position && (!Array.isArray(node.position) || node.position.length !== 3)) {
            errors.push('Node position must be an array of 3 numbers');
        }
        
        return errors;
    }
}
