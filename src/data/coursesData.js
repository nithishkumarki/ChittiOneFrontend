// data/coursesData.js
// Single source of truth for course data. Both the Courses grid page and
// CourseViewer read from here instead of keeping their own separate copies.

const coursesData = [
  // ---------- Class Kindergarten to UKG ----------
  {
    id: 'alphabet-fun',
    title: 'Alphabet Fun',
    grade: 'Class Kindergarten to UKG',
    modulesCount: 2,
    videosCount: 6,
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22220%22%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22%23ff6699%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2228%22%20font-weight%3D%22bold%22%20fill%3D%22%23ffffff%22%3EAlphabet%20Fun%3C%2Ftext%3E%3C%2Fsvg%3E',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Letters A-M',
        videos: [
          { id: 'af-101', title: 'Meet the Alphabet', duration: '3 Minutes', url: '/videos/sample-1.mp4' },
          { id: 'af-102', title: 'A is for Apple', duration: '2 Minutes', url: '/videos/sample-2.mp4' },
          { id: 'af-103', title: 'Letter Sounds A-M', duration: '4 Minutes', url: '/videos/sample-3.mp4' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Letters N-Z',
        videos: [
          { id: 'af-201', title: 'Letter Sounds N-Z', duration: '4 Minutes', url: '/videos/sample-4.mp4' },
          { id: 'af-202', title: 'Z is for Zebra', duration: '2 Minutes', url: '/videos/sample-5.mp4' },
          { id: 'af-203', title: 'Sing the Alphabet Song', duration: '3 Minutes', url: '/videos/sample-6.mp4' },
        ],
      },
    ],
  },
  {
    id: 'shapes-colors',
    title: 'Shapes & Colors',
    grade: 'Class Kindergarten to UKG',
    modulesCount: 2,
    videosCount: 6,
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22220%22%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22%2333cc99%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2228%22%20font-weight%3D%22bold%22%20fill%3D%22%23ffffff%22%3EShapes%20%26%20Colors%3C%2Ftext%3E%3C%2Fsvg%3E',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Shapes',
        videos: [
          { id: 'sc-101', title: 'Circles and Squares', duration: '3 Minutes', url: '/videos/sample-1.mp4' },
          { id: 'sc-102', title: 'Triangles and Stars', duration: '3 Minutes', url: '/videos/sample-2.mp4' },
          { id: 'sc-103', title: 'Shapes All Around Us', duration: '4 Minutes', url: '/videos/sample-3.mp4' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Colors',
        videos: [
          { id: 'sc-201', title: 'Primary Colors', duration: '3 Minutes', url: '/videos/sample-4.mp4' },
          { id: 'sc-202', title: 'Mixing Colors', duration: '4 Minutes', url: '/videos/sample-5.mp4' },
          { id: 'sc-203', title: 'Rainbow Song', duration: '2 Minutes', url: '/videos/sample-6.mp4' },
        ],
      },
    ],
  },

  // ---------- Class 1 to 4 ----------
  {
    id: 'biology',
    title: 'Biology',
    grade: 'Class 1 to 4',
    modulesCount: 2,
    videosCount: 6,
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22220%22%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22%23221100%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2228%22%20font-weight%3D%22bold%22%20fill%3D%22%23ff3333%22%3EBiology%3C%2Ftext%3E%3C%2Fsvg%3E',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Cells & Genetics',
        videos: [
          { id: 'v101', title: 'Pathogens', duration: '3 Minutes', url: '/videos/sample-1.mp4' },
          { id: 'v102', title: 'DNA Structure', duration: '6 Minutes', url: '/videos/sample-2.mp4' },
          { id: 'v103', title: 'Mutation', duration: '8 Minutes', url: '/videos/sample-3.mp4' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Plants & Animals',
        videos: [
          { id: 'v104', title: 'DNA Replication', duration: '7 Minutes', url: '/videos/sample-4.mp4' },
          { id: 'v105', title: 'Inheritance', duration: '4 Minutes', url: '/videos/sample-5.mp4' },
          { id: 'v106', title: 'Meristematic Tissues', duration: '6 Minutes', url: '/videos/sample-6.mp4' },
        ],
      },
    ],
  },
  {
    id: 'cwc',
    title: 'CWC',
    grade: 'Class 1 to 4',
    modulesCount: 2,
    videosCount: 6,
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22220%22%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22%23330066%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2228%22%20font-weight%3D%22bold%22%20fill%3D%22%23ffffff%22%3ECWC%3C%2Ftext%3E%3C%2Fsvg%3E',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Getting Started',
        videos: [
          { id: 'cwc-101', title: 'Welcome to CWC', duration: '3 Minutes', url: '/videos/sample-1.mp4' },
          { id: 'cwc-102', title: 'Basics Overview', duration: '5 Minutes', url: '/videos/sample-2.mp4' },
          { id: 'cwc-103', title: 'Practice Session 1', duration: '4 Minutes', url: '/videos/sample-3.mp4' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Building Up',
        videos: [
          { id: 'cwc-201', title: 'Practice Session 2', duration: '5 Minutes', url: '/videos/sample-4.mp4' },
          { id: 'cwc-202', title: 'Common Mistakes', duration: '4 Minutes', url: '/videos/sample-5.mp4' },
          { id: 'cwc-203', title: 'Wrap Up', duration: '3 Minutes', url: '/videos/sample-6.mp4' },
        ],
      },
    ],
  },
  {
    id: 'chemistry',
    title: 'Chemistry',
    grade: 'Class 1 to 4',
    modulesCount: 2,
    videosCount: 6,
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22220%22%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22%23001133%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2228%22%20font-weight%3D%22bold%22%20fill%3D%22%233399ff%22%3EChemistry%3C%2Ftext%3E%3C%2Fsvg%3E',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Matter Basics',
        videos: [
          { id: 'chem-101', title: 'States of Matter', duration: '4 Minutes', url: '/videos/sample-1.mp4' },
          { id: 'chem-102', title: 'Solids, Liquids, Gases', duration: '5 Minutes', url: '/videos/sample-2.mp4' },
          { id: 'chem-103', title: 'Mixtures & Solutions', duration: '5 Minutes', url: '/videos/sample-3.mp4' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Fun Reactions',
        videos: [
          { id: 'chem-201', title: 'Simple Reactions', duration: '4 Minutes', url: '/videos/sample-4.mp4' },
          { id: 'chem-202', title: 'Kitchen Chemistry', duration: '6 Minutes', url: '/videos/sample-5.mp4' },
          { id: 'chem-203', title: 'Safety First', duration: '3 Minutes', url: '/videos/sample-6.mp4' },
        ],
      },
    ],
  },
  {
    id: 'physics',
    title: 'Physics',
    grade: 'Class 1 to 4',
    modulesCount: 2,
    videosCount: 6,
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22220%22%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22%23003322%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2228%22%20font-weight%3D%22bold%22%20fill%3D%22%2300ffcc%22%3EPhysics%3C%2Ftext%3E%3C%2Fsvg%3E',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Forces & Motion',
        videos: [
          { id: 'phy-101', title: 'Push and Pull', duration: '3 Minutes', url: '/videos/sample-1.mp4' },
          { id: 'phy-102', title: 'Speed & Motion', duration: '5 Minutes', url: '/videos/sample-2.mp4' },
          { id: 'phy-103', title: 'Simple Machines', duration: '6 Minutes', url: '/videos/sample-3.mp4' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Light & Sound',
        videos: [
          { id: 'phy-201', title: 'How Light Travels', duration: '4 Minutes', url: '/videos/sample-4.mp4' },
          { id: 'phy-202', title: 'What Makes Sound', duration: '4 Minutes', url: '/videos/sample-5.mp4' },
          { id: 'phy-203', title: 'Shadows & Reflections', duration: '5 Minutes', url: '/videos/sample-6.mp4' },
        ],
      },
    ],
  },

  // ---------- Class 5 to 8 ----------
  {
    id: 'advanced-biology',
    title: 'Advanced Biology',
    grade: 'Class 5 to 8',
    modulesCount: 2,
    videosCount: 6,
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22220%22%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22%23551111%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2228%22%20font-weight%3D%22bold%22%20fill%3D%22%23ff6666%22%3EAdvanced%20Biology%3C%2Ftext%3E%3C%2Fsvg%3E',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Human Body Systems',
        videos: [
          { id: 'abio-101', title: 'The Circulatory System', duration: '7 Minutes', url: '/videos/sample-1.mp4' },
          { id: 'abio-102', title: 'The Respiratory System', duration: '6 Minutes', url: '/videos/sample-2.mp4' },
          { id: 'abio-103', title: 'The Digestive System', duration: '8 Minutes', url: '/videos/sample-3.mp4' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Ecosystems',
        videos: [
          { id: 'abio-201', title: 'Food Chains & Webs', duration: '6 Minutes', url: '/videos/sample-4.mp4' },
          { id: 'abio-202', title: 'Biodiversity', duration: '7 Minutes', url: '/videos/sample-5.mp4' },
          { id: 'abio-203', title: 'Human Impact on Ecosystems', duration: '9 Minutes', url: '/videos/sample-6.mp4' },
        ],
      },
    ],
  },
  {
    id: 'earth-science',
    title: 'Earth Science',
    grade: 'Class 5 to 8',
    modulesCount: 2,
    videosCount: 6,
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22220%22%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22%23224466%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2228%22%20font-weight%3D%22bold%22%20fill%3D%22%2399ccff%22%3EEarth%20Science%3C%2Ftext%3E%3C%2Fsvg%3E',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Our Planet',
        videos: [
          { id: 'earth-101', title: "Earth's Layers", duration: '5 Minutes', url: '/videos/sample-1.mp4' },
          { id: 'earth-102', title: 'Plate Tectonics', duration: '7 Minutes', url: '/videos/sample-2.mp4' },
          { id: 'earth-103', title: 'Volcanoes & Earthquakes', duration: '8 Minutes', url: '/videos/sample-3.mp4' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Weather & Climate',
        videos: [
          { id: 'earth-201', title: 'The Water Cycle', duration: '5 Minutes', url: '/videos/sample-4.mp4' },
          { id: 'earth-202', title: 'Weather Patterns', duration: '6 Minutes', url: '/videos/sample-5.mp4' },
          { id: 'earth-203', title: 'Climate Change Basics', duration: '9 Minutes', url: '/videos/sample-6.mp4' },
        ],
      },
    ],
  },

  // ---------- Class 9 to 12 ----------
  {
    id: 'organic-chemistry',
    title: 'Organic Chemistry',
    grade: 'Class 9 to 12',
    modulesCount: 2,
    videosCount: 6,
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22220%22%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22%23113322%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2228%22%20font-weight%3D%22bold%22%20fill%3D%22%2333ff99%22%3EOrganic%20Chemistry%3C%2Ftext%3E%3C%2Fsvg%3E',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Hydrocarbons',
        videos: [
          { id: 'orgchem-101', title: 'Alkanes, Alkenes, Alkynes', duration: '9 Minutes', url: '/videos/sample-1.mp4' },
          { id: 'orgchem-102', title: 'Naming Compounds (IUPAC)', duration: '10 Minutes', url: '/videos/sample-2.mp4' },
          { id: 'orgchem-103', title: 'Isomerism', duration: '8 Minutes', url: '/videos/sample-3.mp4' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Functional Groups',
        videos: [
          { id: 'orgchem-201', title: 'Alcohols & Ethers', duration: '9 Minutes', url: '/videos/sample-4.mp4' },
          { id: 'orgchem-202', title: 'Aldehydes & Ketones', duration: '10 Minutes', url: '/videos/sample-5.mp4' },
          { id: 'orgchem-203', title: 'Carboxylic Acids', duration: '8 Minutes', url: '/videos/sample-6.mp4' },
        ],
      },
    ],
  },
  {
    id: 'mechanics',
    title: 'Mechanics',
    grade: 'Class 9 to 12',
    modulesCount: 2,
    videosCount: 6,
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22220%22%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22%23332211%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2228%22%20font-weight%3D%22bold%22%20fill%3D%22%23ffaa33%22%3EMechanics%3C%2Ftext%3E%3C%2Fsvg%3E',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Kinematics',
        videos: [
          { id: 'mech-101', title: 'Displacement & Velocity', duration: '8 Minutes', url: '/videos/sample-1.mp4' },
          { id: 'mech-102', title: 'Acceleration', duration: '7 Minutes', url: '/videos/sample-2.mp4' },
          { id: 'mech-103', title: 'Equations of Motion', duration: '10 Minutes', url: '/videos/sample-3.mp4' },
        ],
      },
      {
        id: 'm2',
        title: "Module 2: Newton's Laws",
        videos: [
          { id: 'mech-201', title: "Newton's First Law", duration: '6 Minutes', url: '/videos/sample-4.mp4' },
          { id: 'mech-202', title: "Newton's Second Law", duration: '8 Minutes', url: '/videos/sample-5.mp4' },
          { id: 'mech-203', title: "Newton's Third Law", duration: '7 Minutes', url: '/videos/sample-6.mp4' },
        ],
      },
    ],
  },

  // ---------- Others ----------
  {
    id: 'robotics',
    title: 'Robotics',
    grade: 'Others',
    modulesCount: 2,
    videosCount: 6,
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22220%22%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22%23222222%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2228%22%20font-weight%3D%22bold%22%20fill%3D%22%2300ffff%22%3ERobotics%3C%2Ftext%3E%3C%2Fsvg%3E',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Robotics Basics',
        videos: [
          { id: 'robo-101', title: 'What is a Robot?', duration: '4 Minutes', url: '/videos/sample-1.mp4' },
          { id: 'robo-102', title: 'Sensors & Actuators', duration: '6 Minutes', url: '/videos/sample-2.mp4' },
          { id: 'robo-103', title: 'Building Your First Robot', duration: '9 Minutes', url: '/videos/sample-3.mp4' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Programming Robots',
        videos: [
          { id: 'robo-201', title: 'Intro to Robot Logic', duration: '7 Minutes', url: '/videos/sample-4.mp4' },
          { id: 'robo-202', title: 'Line Following Robot', duration: '8 Minutes', url: '/videos/sample-5.mp4' },
          { id: 'robo-203', title: 'Obstacle Avoidance', duration: '8 Minutes', url: '/videos/sample-6.mp4' },
        ],
      },
    ],
  },
  {
    id: 'coding-basics',
    title: 'Coding Basics',
    grade: 'Others',
    modulesCount: 2,
    videosCount: 6,
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22220%22%3E%3Crect%20width%3D%22400%22%20height%3D%22220%22%20fill%3D%22%23110022%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-size%3D%2228%22%20font-weight%3D%22bold%22%20fill%3D%22%23cc99ff%22%3ECoding%20Basics%3C%2Ftext%3E%3C%2Fsvg%3E',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Thinking Like a Programmer',
        videos: [
          { id: 'code-101', title: 'What is Coding?', duration: '3 Minutes', url: '/videos/sample-1.mp4' },
          { id: 'code-102', title: 'Loops & Sequences', duration: '6 Minutes', url: '/videos/sample-2.mp4' },
          { id: 'code-103', title: 'Variables Explained', duration: '5 Minutes', url: '/videos/sample-3.mp4' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Your First Project',
        videos: [
          { id: 'code-201', title: 'Planning a Project', duration: '4 Minutes', url: '/videos/sample-4.mp4' },
          { id: 'code-202', title: 'Building It Step by Step', duration: '9 Minutes', url: '/videos/sample-5.mp4' },
          { id: 'code-203', title: 'Debugging Basics', duration: '6 Minutes', url: '/videos/sample-6.mp4' },
        ],
      },
    ],
  },
];

export default coursesData;