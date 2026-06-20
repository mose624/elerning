const fs = require('fs');
const path = require('path');

const GRADES = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
const SUBJECTS = {
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
};

const DIR = path.join(__dirname, 'educational-pages');
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

const TEMPLATE = (grade, subject, type, lessonNum) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject} - ${grade} ${type === 'assessment' ? 'Assessment' : type === 'lesson' ? `Lesson ${lessonNum}` : 'Overview'}</title>
  <link rel="stylesheet" href="../styles.css">
  <style>
    .content-wrapper { max-width: 900px; margin: 2rem auto; padding: 0 1rem; }
    .breadcrumb { margin-bottom: 1rem; font-size: 0.9rem; }
    .section { margin: 2rem 0; }
    .section h2 { border-bottom: 2px solid #0066cc; padding-bottom: 0.5rem; }
    .learning-objectives { background: #f0f4ff; padding: 1rem; border-left: 4px solid #0066cc; }
    .example-box { background: #fff9e6; padding: 1rem; border-left: 4px solid #ffc107; margin: 1rem 0; }
    .activity-box { background: #e6f7ff; padding: 1rem; border-left: 4px solid #0066cc; margin: 1rem 0; }
    .question-box { background: #f0e6ff; padding: 1rem; border-left: 4px solid #7c3aed; margin: 1rem 0; }
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
      <div class="breadcrumb"><a href="/">Home</a> > <a href="/#resources">Resources</a> > ${grade} > ${subject}</div>
      <h1>${subject} - ${grade} ${type === 'assessment' ? 'Assessment Test' : type === 'lesson' ? `Lesson ${lessonNum}` : 'Overview'}</h1>
      <div class="section">
        <h2>Learning Objectives</h2>
        <div class="learning-objectives">
          <p>By the end of this ${type === 'assessment' ? 'assessment' : 'lesson'}, learners should be able to:</p>
          <ul>
            <li>Understand and apply key concepts in ${subject}</li>
            <li>Demonstrate practical skills through activities</li>
            <li>Solve problems using competency-based approaches</li>
            <li>Reflect on learning and identify areas for improvement</li>
          </ul>
        </div>
      </div>
      <div class="section">
        <h2>Content</h2>
        <div class="content-body">
          <p>This ${type === 'assessment' ? 'assessment covers' : 'lesson covers'} ${subject} content aligned with CBC curriculum standards for ${grade}.</p>
          <h3>Key Concepts</h3>
          <p>Understanding the fundamentals of ${subject} is essential for competency development.</p>
          <div class="example-box">
            <h4>Example: Real-World Application</h4>
            <p>${subject} is applied in everyday situations. Learners should recognize these applications and explain how concepts work in practice.</p>
          </div>
          <h3>${type === 'assessment' ? 'Assessment Instructions' : 'Step-by-Step Learning'}</h3>
          <ol>
            <li>Read carefully and understand the requirements</li>
            <li>Apply your knowledge of ${subject}</li>
            <li>Show your working and reasoning clearly</li>
            <li>Review your responses for accuracy</li>
          </ol>
        </div>
      </div>
      ${type === 'lesson' ? `<div class="section">
        <h2>Activity</h2>
        <div class="activity-box">
          <h3>Guided Activity</h3>
          <p><strong>Task:</strong> Complete this activity to practice the concepts learned.</p>
          <ol><li>Read the scenario</li><li>Identify key information</li><li>Apply concepts from this lesson</li><li>Explain your thinking clearly</li></ol>
          <p><em>Time needed: 20-30 minutes</em></p>
        </div>
      </div>` : ''}
      <div class="section">
        <h2>${type === 'assessment' ? 'Assessment Questions' : 'Self-Check Questions'}</h2>
        <div class="question-box">
          <ol>
            <li>What are the main concepts of ${subject} covered in this ${type === 'assessment' ? 'assessment' : 'lesson'}?</li>
            <li>How would you apply this knowledge to a real situation?</li>
            <li>What areas do you need to improve?</li>
            <li>How confident are you in understanding these concepts?</li>
          </ol>
        </div>
      </div>
      <div class="section">
        <h2>Summary</h2>
        <p>In this ${type === 'assessment' ? 'assessment' : 'lesson'}, we explored key concepts in ${subject}. The main takeaways are:</p>
        <ul>
          <li>Core understanding of ${subject} content</li>
          <li>Practical application skills</li>
          <li>Problem-solving approaches aligned with CBC competencies</li>
        </ul>
      </div>
    </div>
  </main>
  <footer class="site-footer"><p>&copy; 2026 CBE E-Learning Resources.</p></footer>
</body>
</html>`;

let count = 0;
for (const grade of GRADES) {
  for (const subject of SUBJECTS[grade]) {
    const slug = (str) => str.toLowerCase().replace(/\s+/g, '-');
    const gradeSlug = slug(grade);
    const subjectSlug = slug(subject);

    // Overview page
    const overviewFile = path.join(DIR, `${gradeSlug}-${subjectSlug}-overview.html`);
    fs.writeFileSync(overviewFile, TEMPLATE(grade, subject, 'overview', 0));
    count++;

    // 2 lesson pages
    for (let i = 1; i <= 2; i++) {
      const lessonFile = path.join(DIR, `${gradeSlug}-${subjectSlug}-lesson-${i}.html`);
      fs.writeFileSync(lessonFile, TEMPLATE(grade, subject, 'lesson', i));
      count++;
    }

    // Assessment page
    const assessmentFile = path.join(DIR, `${gradeSlug}-${subjectSlug}-assessment.html`);
    fs.writeFileSync(assessmentFile, TEMPLATE(grade, subject, 'assessment', 0));
    count++;
  }
}

console.log(`Generated ${count} educational pages in ${DIR}`);
