// ❌
class Part {
    constructor(m_dsc) {
        this.m_dsc = m_dsc;
    }
    function setName(name) {
        m_dsc = name;
    }
}

// ⭕️
class Part {
    constructor(description) {
        description;
    }
    function setDescription(description) {
        this.description = description;
    }
}
