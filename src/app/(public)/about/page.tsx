import React from "react";

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
      <h1>About Our School</h1>
      <p style={{ fontSize: "1.1rem" }}>
        Established in 1998, our institution has been at the forefront of providing exceptional academic 
        and holistic education to students from Kindergarten to High School.
      </p>

      <h2>Our Vision</h2>
      <p>
        To foster a dynamic learning community where every student is inspired to reach their full 
        intellectual, emotional, and social potential.
      </p>

      <h2>Our Mission</h2>
      <ul>
        <li>Deliver a balanced and challenging curriculum.</li>
        <li>Encourage creative thinking, collaboration, and ethical behavior.</li>
        <li>Provide state-of-the-art facilities for sports, science, and the arts.</li>
        <li>Build strong partnerships between teachers, students, parents, and the community.</li>
      </ul>

      <h2>Leadership Message</h2>
      <blockquote style={{ borderLeft: "4px solid #0066cc", paddingLeft: "15px", fontStyle: "italic", margin: "20px 0" }}>
        "At our school, we do not just teach textbooks; we cultivate character, encourage curiosity, and 
        inspire students to become lifelong learners who can contribute positively to a changing world."
        <br />
        <span style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#555" }}>— Dr. Sarah Miller, Principal</span>
      </blockquote>
    </div>
  );
}
