'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeNavigation() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeNavigation();
});

const experiments = {
  grabfood: { label: 'GrabFood', scores: [95.78, 95.31, 95.08] },
  foodpanda: { label: 'FoodPanda', scores: [94.52, 94.55, 94.83] }
};
const trainingSplits = [[80, 20], [70, 30], [60, 40]];
let selectedDataset = 'grabfood';
let selectedSplit = 0;
function updateExperiment() {
  const experiment = experiments[selectedDataset];
  const [training, testing] = trainingSplits[selectedSplit];
  document.querySelector('#accuracy-value').innerHTML = `${experiment.scores[selectedSplit].toFixed(2)}<span>%</span>`;
  document.querySelector('#accuracy-context').textContent = `${experiment.label} · ${training}% training / ${testing}% testing`;
  document.querySelectorAll('[data-dataset]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.dataset === selectedDataset)));
  document.querySelectorAll('[data-split]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.split) === selectedSplit)));
  document.querySelectorAll('[data-row]').forEach((row, index) => {
    const score = experiment.scores[index].toFixed(2);
    row.querySelector('i').style.width = `${score}%`;
    row.querySelector('strong').textContent = `${score}%`;
    row.classList.toggle('selected', index === selectedSplit);
  });
}
document.querySelectorAll('[data-dataset]').forEach(button => button.addEventListener('click', () => {
  selectedDataset = button.dataset.dataset;
  updateExperiment();
}));
document.querySelectorAll('[data-split]').forEach(button => button.addEventListener('click', () => {
  selectedSplit = Number(button.dataset.split);
  updateExperiment();
}));

const caseStudies = {
  operations: {
    category: 'BUSINESS INTELLIGENCE · MR DIY INTERNATIONAL',
    title: 'Operational KPI reporting',
    intro: 'A practical reporting focus: connect operational data to the measures that help teams understand delivery performance.',
    sections: [
      ['The reporting question', 'How can delivery volume and team productivity be presented in a consistent view that business users can read quickly?'],
      ['My work', 'I work with Power BI dashboards, data models, Power Query transformations, and DAX measures for operational KPI reporting. This includes the calculation logic behind delivery metrics and the context needed to compare performance.'],
      ['How I approach it', 'Start with the metric definition and its unit. Check the grain of the source data, shape the model, then verify how filters and team-level calculations affect the result. The visual comes after the measure makes sense.']
    ],
    note: 'Tools: Power BI, DAX and Power Query. The preview is a visual reconstruction using sample data; it is not a screenshot of a live company report.'
  },
  migration: {
    category: 'ETL & DATA MIGRATION · UNIJAYA RESOURCES',
    title: 'Oracle-to-PostgreSQL migration',
    intro: 'Hands-on experience migrating data from Oracle databases to PostgreSQL using Talend, with wider ETL work in Talend and EasyMorph.',
    sections: [
      ['Source and destination', 'I have experience moving data from Oracle databases into PostgreSQL using Talend. My database toolkit also includes MySQL and Oracle SQL.'],
      ['ETL and workflow development', 'I used Talend and EasyMorph for extraction, transformation, and loading, and designed automated workflows to move data from client servers to company or local servers.'],
      ['Volume and integrity', 'My migration work included tables containing up to 2 billion records. I addressed data integrity issues, performance optimisation, and troubleshooting during migration processes.']
    ],
    note: 'Tools and experience: Talend, EasyMorph, Oracle SQL, PostgreSQL, workflow automation, data integrity checks, performance optimisation, and migration troubleshooting.'
  },
  development: {
    category: 'PROGRAMMING & WEB DEVELOPMENT',
    title: 'Laravel interfaces & web projects',
    intro: 'My programming background includes professional front-end development, website projects, automation, and academic programming work.',
    sections: [
      ['Laravel front-end development', 'At Unijaya Resources, I designed and implemented interfaces for systems and websites using the Laravel framework. I collaborated with backend developers and designers to deliver functional user interfaces aligned with business requirements.'],
      ['Website and automation work', 'During my Computer Science internship at FMA Takaful, I developed the Khairat Ummah website, created a WordPress company landing page, and worked on Joomla portal maintenance. At MR DIY, I developed an automated demurrage monitoring workflow using Google Apps Script.'],
      ['Programming foundation', 'My resume lists SQL, Python, PHP, HTML, CSS, Java, C++, and R. My academic projects include a Java object-oriented student attendance system and Python web scraping for food-delivery sentiment analysis.']
    ],
    note: 'Development tools and languages are listed from my resume. My primary career focus remains Data & BI Development, with programming and web development as complementary strengths.'
  },
  regional: {
    category: 'PUBLIC SECTOR REPORTING · UNIJAYA RESOURCES',
    title: 'From national view to local detail',
    intro: 'Power BI reporting for Malaysian forensic case analysis, moving from aggregate totals to the state, district, and hospital context behind them.',
    sections: [
      ['The reporting question', 'How can users explore cases by geography and hospital without losing the meaning of the total or excluding areas with no cases?'],
      ['My work', 'I worked on case-count measures, geographical reference tables, state and district views, and drillthrough to hospital-level reporting. SQL, DAX, relationships, and filter context were central to connecting these views.'],
      ['Details that matter', 'Display all relevant states and districts, including zero values. Keep national totals consistent with the selected context. Ensure hospital selections follow the intended state filter, and use distinct case counts where the underlying data contains multiple records per case.']
    ],
    note: 'Tools: Power BI, SQL and DAX. This summary describes the reporting approach; the preview uses illustrative regions and sample data.'
  }
};
const caseDialog = document.querySelector('#case-dialog');
let dialogTrigger = null;
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
  const study = caseStudies[button.dataset.case];
  dialogTrigger = button;
  document.querySelector('#case-category').textContent = study.category;
  document.querySelector('#case-title').textContent = study.title;
  document.querySelector('#case-intro').textContent = study.intro;
  const content = document.querySelector('#case-content');
  content.replaceChildren();
  study.sections.forEach(([title, body]) => {
    const heading = document.createElement('h3');
    heading.textContent = title;
    const paragraph = document.createElement('p');
    paragraph.textContent = body;
    content.append(heading, paragraph);
  });
  const note = document.createElement('p');
  note.className = 'dialog-evidence';
  note.textContent = study.note;
  content.append(note);
  caseDialog.showModal();
  document.body.classList.add('dialog-open');
  caseDialog.scrollTop = 0;
}));
document.querySelector('.dialog-close').addEventListener('click', () => caseDialog.close());
caseDialog.addEventListener('click', event => {
  if (event.target !== caseDialog) return;
  const bounds = caseDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) caseDialog.close();
});
caseDialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (dialogTrigger) dialogTrigger.focus({ preventScroll: true });
});
document.querySelector('#case-contact').addEventListener('click', () => caseDialog.close());

document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('rohaifizabdulkarim@gmail.com');
    status.textContent = 'Email copied.';
  } catch {
    status.textContent = 'Email: rohaifizabdulkarim@gmail.com';
  }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
