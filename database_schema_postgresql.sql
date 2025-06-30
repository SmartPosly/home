-- SMARTPOS Database Schema for PostgreSQL
-- Support Tickets and Order Management System

-- Create database (uncomment for local testing)
-- CREATE DATABASE smartpos_db;
-- \c smartpos_db;

-- ========================================
-- USERS TABLE
-- ========================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    company_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ========================================
-- SUPPORT TICKETS TABLE
-- ========================================
CREATE TABLE support_tickets (
    id SERIAL PRIMARY KEY,
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    user_id INTEGER,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    assigned_to INTEGER NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_support_tickets_ticket_number ON support_tickets(ticket_number);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_priority ON support_tickets(priority);
CREATE INDEX idx_support_tickets_created_at ON support_tickets(created_at);
CREATE INDEX idx_support_tickets_email ON support_tickets(email);

-- ========================================
-- SUPPORT TICKET RESPONSES TABLE
-- ========================================
CREATE TABLE support_responses (
    id SERIAL PRIMARY KEY,
    ticket_id INTEGER NOT NULL,
    user_id INTEGER NULL,
    admin_id INTEGER NULL,
    message TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_support_responses_ticket_id ON support_responses(ticket_id);
CREATE INDEX idx_support_responses_created_at ON support_responses(created_at);

-- ========================================
-- PRICING PACKAGES TABLE
-- ========================================
CREATE TABLE pricing_packages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'دينار',
    period VARCHAR(50) DEFAULT 'شهرياً',
    is_popular BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pricing_packages_is_active ON pricing_packages(is_active);
CREATE INDEX idx_pricing_packages_is_popular ON pricing_packages(is_popular);

-- ========================================
-- PACKAGE FEATURES TABLE
-- ========================================
CREATE TABLE package_features (
    id SERIAL PRIMARY KEY,
    package_id INTEGER NOT NULL,
    feature_text TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (package_id) REFERENCES pricing_packages(id) ON DELETE CASCADE
);

CREATE INDEX idx_package_features_package_id ON package_features(package_id);
CREATE INDEX idx_package_features_sort_order ON package_features(sort_order);

-- ========================================
-- ORDERS TABLE
-- ========================================
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(20) UNIQUE NOT NULL,
    user_id INTEGER,
    package_id INTEGER NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    company_name VARCHAR(255),
    quantity INTEGER DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'دينار',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'completed', 'cancelled')),
    payment_method VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (package_id) REFERENCES pricing_packages(id)
);

CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);

-- ========================================
-- SITE CONTENT TABLE
-- ========================================
CREATE TABLE site_content (
    id SERIAL PRIMARY KEY,
    page_name VARCHAR(100) NOT NULL,
    section_name VARCHAR(100) NOT NULL,
    content_key VARCHAR(100) NOT NULL,
    content_value TEXT,
    content_type VARCHAR(20) DEFAULT 'text' CHECK (content_type IN ('text', 'html', 'json')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(page_name, section_name, content_key)
);

CREATE INDEX idx_site_content_page_section ON site_content(page_name, section_name);
CREATE INDEX idx_site_content_is_active ON site_content(is_active);

-- ========================================
-- CONTACT REQUESTS TABLE
-- ========================================
CREATE TABLE contact_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contact_requests_status ON contact_requests(status);
CREATE INDEX idx_contact_requests_created_at ON contact_requests(created_at);
CREATE INDEX idx_contact_requests_email ON contact_requests(email);

-- ========================================
-- FUNCTIONS FOR AUTO-UPDATING TIMESTAMPS
-- ========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ========================================
-- TRIGGERS FOR AUTO-UPDATING TIMESTAMPS
-- ========================================

-- Users table trigger
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Support tickets table trigger
CREATE TRIGGER update_support_tickets_updated_at 
    BEFORE UPDATE ON support_tickets 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Pricing packages table trigger
CREATE TRIGGER update_pricing_packages_updated_at 
    BEFORE UPDATE ON pricing_packages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Orders table trigger
CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Site content table trigger
CREATE TRIGGER update_site_content_updated_at 
    BEFORE UPDATE ON site_content 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Contact requests table trigger
CREATE TRIGGER update_contact_requests_updated_at 
    BEFORE UPDATE ON contact_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- FUNCTIONS FOR CREATING TICKETS AND ORDERS
-- ========================================

-- Function to create a new support ticket
CREATE OR REPLACE FUNCTION create_support_ticket(
    p_name VARCHAR(255),
    p_email VARCHAR(255),
    p_subject VARCHAR(255),
    p_description TEXT,
    p_priority VARCHAR(20)
)
RETURNS TABLE(ticket_number VARCHAR(20), ticket_id INTEGER) AS $$
DECLARE
    v_ticket_number VARCHAR(20);
    v_user_id INTEGER;
    v_ticket_id INTEGER;
BEGIN
    -- Generate ticket number
    SELECT 'TKT-' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || 
           LPAD(COALESCE(COUNT(*), 0) + 1::TEXT, 4, '0')
    INTO v_ticket_number
    FROM support_tickets 
    WHERE DATE(created_at) = CURRENT_DATE;
    
    -- Find or create user
    SELECT id INTO v_user_id FROM users WHERE email = p_email LIMIT 1;
    IF v_user_id IS NULL THEN
        INSERT INTO users (name, email) VALUES (p_name, p_email);
        v_user_id := currval('users_id_seq');
    END IF;
    
    -- Create ticket
    INSERT INTO support_tickets (ticket_number, user_id, name, email, subject, description, priority)
    VALUES (v_ticket_number, v_user_id, p_name, p_email, p_subject, p_description, p_priority);
    
    v_ticket_id := currval('support_tickets_id_seq');
    
    RETURN QUERY SELECT v_ticket_number, v_ticket_id;
END;
$$ LANGUAGE plpgsql;

-- Function to create a new order
CREATE OR REPLACE FUNCTION create_order(
    p_customer_name VARCHAR(255),
    p_customer_email VARCHAR(255),
    p_customer_phone VARCHAR(50),
    p_company_name VARCHAR(255),
    p_package_id INTEGER,
    p_quantity INTEGER,
    p_total_amount DECIMAL(10,2),
    p_notes TEXT
)
RETURNS TABLE(order_number VARCHAR(20), order_id INTEGER) AS $$
DECLARE
    v_order_number VARCHAR(20);
    v_user_id INTEGER;
    v_order_id INTEGER;
BEGIN
    -- Generate order number
    SELECT 'ORD-' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || 
           LPAD(COALESCE(COUNT(*), 0) + 1::TEXT, 4, '0')
    INTO v_order_number
    FROM orders 
    WHERE DATE(created_at) = CURRENT_DATE;
    
    -- Find or create user
    SELECT id INTO v_user_id FROM users WHERE email = p_customer_email LIMIT 1;
    IF v_user_id IS NULL THEN
        INSERT INTO users (name, email, phone, company_name) VALUES (p_customer_name, p_customer_email, p_customer_phone, p_company_name);
        v_user_id := currval('users_id_seq');
    END IF;
    
    -- Create order
    INSERT INTO orders (order_number, user_id, package_id, customer_name, customer_email, customer_phone, company_name, quantity, total_amount, notes)
    VALUES (v_order_number, v_user_id, p_package_id, p_customer_name, p_customer_email, p_customer_phone, p_company_name, p_quantity, p_total_amount, p_notes);
    
    v_order_id := currval('orders_id_seq');
    
    RETURN QUERY SELECT v_order_number, v_order_id;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- VIEWS
-- ========================================

-- View for active pricing packages with features
CREATE VIEW v_pricing_packages AS
SELECT 
    pp.*,
    STRING_AGG(pf.feature_text, '|' ORDER BY pf.sort_order) as features
FROM pricing_packages pp
LEFT JOIN package_features pf ON pp.id = pf.package_id
WHERE pp.is_active = TRUE
GROUP BY pp.id, pp.name, pp.price, pp.currency, pp.period, pp.is_popular, pp.is_active, pp.created_at, pp.updated_at;

-- View for support tickets with user info
CREATE VIEW v_support_tickets AS
SELECT 
    st.*,
    u.company_name,
    u.phone as user_phone,
    (SELECT COUNT(*) FROM support_responses sr WHERE sr.ticket_id = st.id) as response_count
FROM support_tickets st
LEFT JOIN users u ON st.user_id = u.id;

-- View for orders with package info
CREATE VIEW v_orders AS
SELECT 
    o.*,
    pp.name as package_name,
    pp.price as package_price,
    u.company_name,
    u.phone as user_phone
FROM orders o
LEFT JOIN pricing_packages pp ON o.package_id = pp.id
LEFT JOIN users u ON o.user_id = u.id;

-- ========================================
-- SAMPLE DATA INSERTION
-- ========================================

-- Insert sample pricing packages
INSERT INTO pricing_packages (name, price, currency, period, is_popular) VALUES
('الباقة الأساسية', 99.00, 'دينار', 'شهرياً', FALSE),
('الباقة المتقدمة', 199.00, 'دينار', 'شهرياً', TRUE),
('الباقة الاحترافية', 299.00, 'دينار', 'شهرياً', FALSE);

-- Insert package features
INSERT INTO package_features (package_id, feature_text, sort_order) VALUES
(1, 'إدارة المبيعات', 1),
(1, 'تقارير أساسية', 2),
(1, 'دعم فني', 3),
(2, 'جميع مميزات الباقة الأساسية', 1),
(2, 'إدارة المخزون', 2),
(2, 'تقارير متقدمة', 3),
(2, 'دعم فني 24/7', 4),
(3, 'جميع مميزات الباقة المتقدمة', 1),
(3, 'إدارة متعددة الفروع', 2),
(3, 'API مخصص', 3),
(3, 'تدريب مجاني', 4);

-- Insert sample site content
INSERT INTO site_content (page_name, section_name, content_key, content_value) VALUES
('home', 'hero', 'title', 'SMARTPoS - نظام نقاط البيع الذكي'),
('home', 'hero', 'subtitle', 'حلول متكاملة لإدارة المبيعات والمخزون'),
('home', 'features', 'title', 'المميزات الرئيسية'),
('contact', 'info', 'email', 'info@smartpos.ly'),
('contact', 'info', 'phone', '+218913807888'),
('contact', 'info', 'address', '32°53''22.1"N 13°11''31.0"E'),
('contact', 'info', 'facebook', 'https://www.facebook.com/SMARTPOS23'),
('support', 'settings', 'response_time', '24 ساعة'),
('support', 'settings', 'support_email', 'info@smartpos.ly'),
('support', 'settings', 'support_phone', '+218913807888');

-- ========================================
-- ADDITIONAL INDEXES FOR PERFORMANCE
-- ========================================

CREATE INDEX idx_support_tickets_user_email ON support_tickets(user_id, email);
CREATE INDEX idx_orders_user_package ON orders(user_id, package_id);
CREATE INDEX idx_site_content_active ON site_content(is_active, page_name, section_name);
CREATE INDEX idx_contact_requests_status_date ON contact_requests(status, created_at); 