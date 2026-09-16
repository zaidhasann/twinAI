import os, re
files = [
    'src/pages/InterviewsPage.tsx',
    'src/pages/PracticePage.tsx',
    'src/pages/ProgressPage.tsx',
    'src/pages/ResumePage.tsx',
    'src/pages/RoadmapPage.tsx',
    'src/pages/SkillGapPage.tsx'
]
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        s = f.read()
    s = re.sub(r'Status: \${progressPercentage}% Completed', 'Status: ', s)
    s = re.sub(r'style={{\s*width:\s*\$\{([^}]+)\}% ^}}', rstyle={{ width: `${\1}%` }}', s)
    s = re.sub(r'className={([ AZa-z0-9_-\.\:\/s\#\[\]=%\$\{\}]+)\}', r'className="\1'', s)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(s)
    print('Cleaned', fpath)
