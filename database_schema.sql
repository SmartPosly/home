-- SMARTPOS Database Schema
-- Support Tickets and Order Management System

-- Create database (uncomment for local testing)
-- CREATE DATABASE smartpos_db;
-- USE smartpos_db;

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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);

-- ========================================
-- SUPPORT TICKETS TABLE
-- ========================================
CREATE TABLE support_tickets (
    id SERIAL PRIMARY KEY,
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
    assigned_to INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_ticket_number (ticket_number),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_created_at (created_at),
    INDEX idx_email (email)
);

-- ========================================
-- SUPPORT TICKET RESPONSES TABLE
-- ========================================
CREATE TABLE support_responses (
    id SERIAL PRIMARY KEY,
    ticket_id INT NOT NULL,
    user_id INT NULL,
    admin_id INT NULL,
    message TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_ticket_id (ticket_id),
    INDEX idx_created_at (created_at)
);

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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_is_active (is_active),
    INDEX idx_is_popular (is_popular)
);

-- ========================================
-- PACKAGE FEATURES TABLE
-- ========================================
CREATE TABLE package_features (
    id SERIAL PRIMARY KEY,
    package_id INT NOT NULL,
    feature_text TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (package_id) REFERENCES pricing_packages(id) ON DELETE CASCADE,
    INDEX idx_package_id (package_id),
    INDEX idx_sort_order (sort_order)
);

-- ========================================
-- ORDERS TABLE
-- ========================================
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(20) UNIQUE NOT NULL,
    user_id INT,
    package_id INT NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    company_name VARCHAR(255),
    quantity INT DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'دينار',
    status ENUM('pending', 'confirmed', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (package_id) REFERENCES pricing_packages(id),
    INDEX idx_order_number (order_number),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_created_at (created_at),
    INDEX idx_customer_email (customer_email)
);

-- ========================================
-- SITE CONTENT TABLE
-- ========================================
CREATE TABLE site_content (
    id SERIAL PRIMARY KEY,
    page_name VARCHAR(100) NOT NULL,
    section_name VARCHAR(100) NOT NULL,
    content_key VARCHAR(100) NOT NULL,
    content_value TEXT,
    content_type ENUM('text', 'html', 'json') DEFAULT 'text',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_content (page_name, section_name, content_key),
    INDEX idx_page_section (page_name, section_name),
    INDEX idx_is_active (is_active)
);

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
    status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_email (email)
);

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
('contact', 'info', 'address', '32°53\'22.1"N 13°11\'31.0"E'),
('contact', 'info', 'facebook', 'https://www.facebook.com/SMARTPOS23'),
('support', 'settings', 'response_time', '24 ساعة'),
('support', 'settings', 'support_email', 'info@smartpos.ly'),
('support', 'settings', 'support_phone', '+218913807888');

-- ========================================
-- STORED PROCEDURES
-- ========================================

-- Procedure to create a new support ticket
DELIMITER //
CREATE PROCEDURE CreateSupportTicket(
    IN p_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_subject VARCHAR(255),
    IN p_description TEXT,
    IN p_priority ENUM('low', 'medium', 'high', 'urgent')
)
BEGIN
    DECLARE v_ticket_number VARCHAR(20);
    DECLARE v_user_id INT;
    
    -- Generate ticket number
    SET v_ticket_number = CONCAT('TKT-', DATE_FORMAT(NOW(), '%Y%m%d'), '-', LPAD((SELECT COUNT(*) + 1 FROM support_tickets WHERE DATE(created_at) = CURDATE()), 4, '0'));
    
    -- Find or create user
    SELECT id INTO v_user_id FROM users WHERE email = p_email LIMIT 1;
    IF v_user_id IS NULL THEN
        INSERT INTO users (name, email) VALUES (p_name, p_email);
        SET v_user_id = LAST_INSERT_ID();
    END IF;
    
    -- Create ticket
    INSERT INTO support_tickets (ticket_number, user_id, name, email, subject, description, priority)
    VALUES (v_ticket_number, v_user_id, p_name, p_email, p_subject, p_description, p_priority);
    
    SELECT v_ticket_number as ticket_number, LAST_INSERT_ID() as ticket_id;
END //
DELIMITER ;

-- Procedure to create a new order
DELIMITER //
CREATE PROCEDURE CreateOrder(
    IN p_customer_name VARCHAR(255),
    IN p_customer_email VARCHAR(255),
    IN p_customer_phone VARCHAR(50),
    IN p_company_name VARCHAR(255),
    IN p_package_id INT,
    IN p_quantity INT,
    IN p_total_amount DECIMAL(10,2),
    IN p_notes TEXT
)
BEGIN
    DECLARE v_order_number VARCHAR(20);
    DECLARE v_user_id INT;
    
    -- Generate order number
    SET v_order_number = CONCAT('ORD-', DATE_FORMAT(NOW(), '%Y%m%d'), '-', LPAD((SELECT COUNT(*) + 1 FROM orders WHERE DATE(created_at) = CURDATE()), 4, '0'));
    
    -- Find or create user
    SELECT id INTO v_user_id FROM users WHERE email = p_customer_email LIMIT 1;
    IF v_user_id IS NULL THEN
        INSERT INTO users (name, email, phone, company_name) VALUES (p_customer_name, p_customer_email, p_customer_phone, p_company_name);
        SET v_user_id = LAST_INSERT_ID();
    END IF;
    
    -- Create order
    INSERT INTO orders (order_number, user_id, package_id, customer_name, customer_email, customer_phone, company_name, quantity, total_amount, notes)
    VALUES (v_order_number, v_user_id, p_package_id, p_customer_name, p_customer_email, p_customer_phone, p_company_name, p_quantity, p_total_amount, p_notes);
    
    SELECT v_order_number as order_number, LAST_INSERT_ID() as order_id;
END //
DELIMITER ;

-- ========================================
-- VIEWS
-- ========================================

-- View for active pricing packages with features
CREATE VIEW v_pricing_packages AS
SELECT 
    pp.*,
    GROUP_CONCAT(pf.feature_text ORDER BY pf.sort_order SEPARATOR '|') as features
FROM pricing_packages pp
LEFT JOIN package_features pf ON pp.id = pf.package_id
WHERE pp.is_active = TRUE
GROUP BY pp.id;

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
-- INDEXES FOR PERFORMANCE
-- ========================================

-- Additional indexes for better performance
CREATE INDEX idx_support_tickets_user_email ON support_tickets(user_id, email);
CREATE INDEX idx_orders_user_package ON orders(user_id, package_id);
CREATE INDEX idx_site_content_active ON site_content(is_active, page_name, section_name);
CREATE INDEX idx_contact_requests_status_date ON contact_requests(status, created_at);

-- ========================================
-- TRIGGERS
-- ========================================

-- Trigger to update user when order is created
DELIMITER //
CREATE TRIGGER after_order_insert
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    UPDATE users 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.user_id;
END //
DELIMITER ;

-- Trigger to update ticket when response is added
DELIMITER //
CREATE TRIGGER after_response_insert
AFTER INSERT ON support_responses
FOR EACH ROW
BEGIN
    UPDATE support_tickets 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.ticket_id;
END //
DELIMITER ; 