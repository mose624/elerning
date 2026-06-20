import os

grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
subjects_map = {
    'Grade 1': ['Mathematics', 'English', 'Science'],
    'Grade 2': ['Mathematics', 'English', 'Science'],
    'Grade 3': ['Mathematics', 'English', 'Science'],
    'Grade 4': ['Mathematics', 'English', 'Science', 'Social Studies'],
    'Grade 5': ['Mathematics', 'English', 'Science', 'Social Studies'],
    'Grade 6': ['Mathematics', 'English', 'Science', 'Social Studies'],
    'Grade 7': ['Mathematics', 'English', 'Integrated Science', 'Social Studies'],
    'Grade 8': ['Mathematics', 'English', 'Integrated Science', 'Social Studies'],
    'Grade 9': ['Mathematics', 'English', 'Integrated Science', 'Social Studies'],
    'Grade 10': ['Mathematics', 'English', 'Biology', 'Chemistry', 'Physics'],
    'Grade 11': ['Mathematics', 'English', 'Biology', 'Chemistry', 'Physics'],
    'Grade 12': ['Mathematics', 'English', 'Biology', 'Chemistry', 'Physics']
}

os.makedirs("educational-pages", exist_ok=True)

def slug(s):
    return s.lower().replace(' ', '-').replace('/', '-')

def create_page(grade, subject, page_type, lesson_num=0):
    grade_slug = slug(grade)
    subject_slug = slug(subject)

    if page_type == 'overview':
        filename = f"educational-pages/{grade_slug}-{subject_slug}-overview.html"
        title = f"{subject} - {grade} Overview"
    elif page_type == 'assessment':
        filename = f"educational-pages/{grade_slug}-{subject_slug}-assessment.html"
        title = f"{subject} - {grade} Assessment Test"
    else:
        filename = f"educational-pages/{grade_slug}-{subject_slug}-lesson-{lesson_num}.html"
        title = f"{subject} - {grade} Lesson {lesson_num}"

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <link rel="stylesheet" href="../styles.css">
  <style>
    .content-wrapper {{ max-width: 900px; margin: 2rem auto; padding: 0 1rem; }}
    .breadcrumb {{ margin-bottom: 1rem; font-size: 0.9rem; }}
    .section {{ margin: 2rem 0; }}
    .section h2 {{ border-bottom: 2px solid #0066cc; padding-bottom: 0.5rem; }}
    .learning-objectives {{ background: #f0f4ff; padding: 1rem; border-left: 4px solid #0066cc; }}
    .example-box {{ background: #fff9e6; padding: 1rem; border-left: 4px solid #ffc107; margin: 1rem 0; }}
    .activity-box {{ background: #e6f7ff; padding: 1rem; border-left: 4px solid #0066cc; margin: 1rem 0; }}
    .question-box {{ background: #f0e6ff; padding: 1rem; border-left: 4px solid #7c3aed; margin: 1rem 0; }}
  </style>
</head>
<body>
  <header class="site-header">
    <nav class="main-nav">
      <a class="brand" href="/"><span class="brand-mark">CBE</span><span><strong>E-Learning</strong></span></a>
    </nav>
  </header>
  <main>
    <div class="content-wrapper">
      <div class="breadcrumb"><a href="/">Home</a> > <a href="/#resources">Resources</a> > {grade} > {subject}</div>
      <h1>{title}</h1>
      <div class="section">
        <h2>Learning Objectives</h2>
        <div class="learning-objectives">
          <p>By the end of this {"assessment" if page_type == "assessment" else "lesson"}, you should be able to:</p>
          <ul>
            <li>Understand and apply key concepts in {subject}</li>
            <li>Demonstrate practical skills through activities</li>
            <li>Solve problems using competency-based approaches</li>
            <li>Reflect on learning and identify areas for improvement</li>
          </ul>
        </div>
      </div>
      <div class="section">
        <h2>Content</h2>
        <p>This {"assessment covers" if page_type == "assessment" else "lesson covers"} {subject} content for {grade}.</p>
        <h3>Key Concepts</h3>
        <div class="example-box">
          <p><strong>Real-World Application:</strong> {subject} is essential in everyday life. Understanding these concepts helps you solve real problems and make informed decisions.</p>
        </div>
        <h3>Learning Steps</h3>
        <ol>
          <li>Read and understand the content carefully</li>
          <li>Work through examples with guidance</li>
          <li>Practice with similar problems</li>
          <li>Apply learning to new situations</li>
        </ol>
      </div>
      {"<div class='section'><h2>Activities</h2><div class='activity-box'><h3>Practice Tasks</h3><p>Complete these to reinforce your understanding (25-35 minutes):</p><ol><li>Read the scenario</li><li>Identify key information</li><li>Apply concepts</li><li>Show your work</li></ol></div></div>" if page_type != "assessment" else ""}
      <div class="section">
        <h2>{"Assessment Questions" if page_type == "assessment" else "Self-Check"}</h2>
        <div class="question-box">
          <ol>
            <li>What are the main concepts covered?</li>
            <li>How would you apply this in real life?</li>
            <li>What areas need more practice?</li>
            <li>Rate your confidence: 1-5</li>
          </ol>
        </div>
      </div>
      <div class="section">
        <h2>Summary</h2>
        <ul>
          <li>Core understanding of {subject}</li>
          <li>Practical application skills</li>
          <li>Foundation for advanced topics</li>
        </ul>
      </div>
    </div>
  </main>
  <footer class="site-footer">
    <p>&copy; 2026 CBE E-Learning Resources. All rights reserved.</p>
  </footer>
</body>
</html>"""

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html_content)

count = 0
for grade in grades:
    subjects = subjects_map[grade]
    for subject in subjects:
        create_page(grade, subject, 'overview')
        count += 1
        for i in range(1, 3):
            create_page(grade, subject, 'lesson', i)
            count += 1
        create_page(grade, subject, 'assessment')
        count += 1

print(f"Generated {count} educational pages")
