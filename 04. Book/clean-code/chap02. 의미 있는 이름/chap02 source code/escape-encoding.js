// ❌
class Part {
    constructor(m_dsc) {
        this.m_dsc = m_dsc;
    }
    
    setName(name) {
        m_dsc = name;
    }
}

// ⭕️
class Part {
    constructor(description) {
        this.description = description;
    }
    
    setDescription(description) {
        this.description = description;
    }
}
