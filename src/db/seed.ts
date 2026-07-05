import { db } from "./db";
import { users, notices, events, blogs, gallery, inquiries } from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  // Hash password for admin (admin / admin123)
  const passwordHash = await bcrypt.hash("admin123", 10);

  // Insert admin user
  const [adminUser] = await db
    .insert(users)
    .values({
      username: "admin",
      passwordHash: passwordHash,
      role: "admin",
    })
    .returning();

  console.log(`Admin user created: ${adminUser.username}`);

  // Insert mock notices
  await db.insert(notices).values([
    {
      title: "Summer Vacation Announcement",
      content:
        "The school will remain closed for summer vacation from June 1st to July 10th. Classes will resume on July 11th. Have a great break!",
      isPinned: true,
    },
    {
      title: "Annual Science Fair 2026 Guidelines",
      content:
        "Students from Grade 6 to 12 are invited to register their projects for the Science Fair by July 20th. Please download the guidelines document.",
      attachmentUrl: "/uploads/science-fair-guidelines.pdf",
      isPinned: false,
    },
  ]);

  // Insert mock events
  await db.insert(events).values([
    {
      title: "Annual Sports Meet",
      description:
        "Join us for the annual track and field events, relay races, tug-of-war, and awards ceremony. Parents are cordially invited.",
      date: "2026-08-15",
      location: "Main School Sports Ground",
      imageUrl: "/uploads/sports-meet.jpg",
    },
    {
      title: "Parent-Teacher Association Meeting",
      description:
        "Quarterly PTA meeting to discuss academic progress, extracurricular schedules, and upcoming curriculum modifications for the second term.",
      date: "2026-07-25",
      location: "School Auditorium",
      imageUrl: null,
    },
  ]);

  // Insert mock blogs
  await db.insert(blogs).values([
    {
      title: "How to Prepare for College Admissions: A Step-by-Step Guide",
      content:
        "A comprehensive guide for high school students highlighting timeline management, standardized test preparations, essay writing, and portfolio building. Planning early in Grade 11 is highly recommended to secure placements in top-tier universities.",
      author: "Principal Dr. Sarah Miller",
      imageUrl: "/uploads/college-prep.jpg",
    },
    {
      title: "School Robotics Team Wins State Championship!",
      content:
        "Congratulations to our Robotics Team 'CyberStorm' for securing 1st place in the State Robotics League competition. They developed an autonomous cargo sorter bot that outmatched 30 other schools in accuracy and speed. We are incredibly proud of their dedication.",
      author: "Mr. John Davis (Robotics Coach)",
      imageUrl: "/uploads/robotics-win.jpg",
    },
  ]);

  // Insert mock gallery items
  await db.insert(gallery).values([
    {
      type: "photo",
      url: "/uploads/campus-front.jpg",
      caption: "Main School Building and Campus Frontage",
      category: "Infrastructure",
    },
    {
      type: "photo",
      url: "/uploads/chemistry-lab.jpg",
      caption: "Fully equipped chemistry laboratory for high school students",
      category: "Infrastructure",
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      caption: "School Annual Day Highlights Video",
      category: "Events",
    },
  ]);

  // Insert mock inquiries
  await db.insert(inquiries).values([
    {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      subject: "Admission inquiry for Grade 5",
      message:
        "Hello, I would like to know the admission process, fee structure, and document requirements for Grade 5 admissions for the upcoming term.",
      isRead: false,
    },
    {
      name: "Robert Smith",
      email: "robert.smith@example.com",
      subject: "Employment opportunities in Mathematics Department",
      message:
        "Dear Hiring Team, I am an experienced high school Math teacher with 6 years of experience looking for open positions at your institution. I have attached my resume via email.",
      isRead: true,
    },
  ]);

  console.log("Seeding completed successfully!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
