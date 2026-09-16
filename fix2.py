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
    s = s.replace("style={{ width: ${", 'style={{ width: ` ${')
    s = s.replace("% }}", "%` }}")
    s = re.sub(r'className={(\\s*ext-[^}]+)\}', r'className="text-\1"',s)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(s)
    print('Cleaned', fpath)
