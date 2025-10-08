import React from 'react';

// AboutPage Component
const AboutPage = () => {
  return (
    <div style={styles.aboutPage}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>About Amazon</h1>
      </div>

      {/* Content Section */}
      <div style={styles.contentSection}>
        <h2 style={styles.sectionTitle}>Who We Are</h2>
        <p style={styles.paragraph}>
          Amazon is a global leader in e-commerce, cloud computing, and artificial intelligence.
          Founded in 1994 by Jeff Bezos, we have transformed the way people shop and interact with technology.
        </p>

        <h3 style={styles.subTitle}>Our Mission</h3>
        <p style={styles.paragraph}>
          Our mission is to be Earth's most customer-centric company. We aim to provide customers with the best
          possible shopping experience, whether it's in terms of product selection, prices, or delivery speed.
        </p>

        <h3 style={styles.subTitle}>What We Offer</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}>Online shopping for millions of products</li>
          <li style={styles.listItem}>Fast and reliable delivery services</li>
          <li style={styles.listItem}>Prime membership for exclusive perks</li>
          <li style={styles.listItem}>Cloud services through AWS (Amazon Web Services)</li>
          <li style={styles.listItem}>AI-powered devices like Alexa</li>
        </ul>
      </div>

      {/* Footer Section */}
      <div style={styles.footer}>
        <p style={styles.footerText}>© 2025 Amazon.com, Inc. or its affiliates. All Rights Reserved.</p>
        <a href="/privacy-policy" style={styles.footerLink}>Privacy Policy</a> | 
        <a href="/terms" style={styles.footerLink}> Terms of Service</a>
      </div>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  aboutPage: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#FAF9EE', // Ivory White
    color: '#333',
    margin: 0,
    padding: 0,
  },
  header: {
    backgroundColor: '#232F3E', // Amazon Blue
    color: 'white',
    padding: '20px',
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: '36px',
    margin: 0,
  },
  contentSection: {
    padding: '40px',
    color: '#333',
  },
  sectionTitle: {
    color: '#A2AF9B', // Moss Green
  },
  subTitle: {
    color: '#A2AF9B', // Moss Green
  },
  paragraph: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '20px',
  },
  listItem: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#555',
    marginBottom: '10px',
  },
  footer: {
    backgroundColor: '#232F3E', // Amazon Blue
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    marginTop: '40px',
  },
  footerText: {
    margin: 0,
  },
  footerLink: {
    color: '#FF9900', // Amazon Yellow
    textDecoration: 'none',
    marginLeft: '5px',
  },
};

export default AboutPage;
