import os

# 1. Update DigitalTwinPage.tsx
dt_path = r'C:\Users\ASUS\.gemini\antigravity\scratch\twinAI\src\pages\DigitalTwinPage.tsx'
with open(dt_path, 'r', encoding='utf-8') as f:
    dt_text = f.read().replace('\r\n', '\n')

dt_text = dt_text.replace(
    '<span className="text-xs font-extrabold text-white leading-none">Alex.Twin</span>',
    '<span className="text-xs font-extrabold text-white leading-none">{profile ? profile.name.split(\' \')[0] : \'My\'}.Twin</span>'
)

with open(dt_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(dt_text)
print("Updated DigitalTwinPage dynamic name")

# 2. Update LandingPage.tsx with StudentAuthModal
lp_path = r'C:\Users\ASUS\.gemini\antigravity\scratch\twinAI\src\pages\LandingPage.tsx'
with open(lp_path, 'r', encoding='utf-8') as f:
    lp_text = f.read().replace('\r\n', '\n')

if 'StudentAuthModal' not in lp_text:
    lp_text = lp_text.replace(
        "import { Logo } from '../components/Logo';",
        "import { Logo } from '../components/Logo';\nimport { StudentAuthModal } from '../components/StudentAuthModal';"
    )

if 'showAuthModal' not in lp_text:
    lp_text = lp_text.replace(
        "const navigate = useNavigate();",
        "const navigate = useNavigate();\n  const [showAuthModal, setShowAuthModal] = useState(false);"
    )

old_sign_in_link = """          <Link
            to="/dashboard"
            className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-2 transition-colors"
          >
            Demo Sign In
          </Link>"""

new_sign_in_link = """          <button
            onClick={() => setShowAuthModal(true)}
            className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-2 transition-colors cursor-pointer"
          >
            Student Sign In / Demo
          </button>"""

if old_sign_in_link in lp_text:
    lp_text = lp_text.replace(old_sign_in_link, new_sign_in_link)
    print("Replaced LandingPage sign in link with modal button")

# Add modal before closing root div
if '<StudentAuthModal' not in lp_text:
    lp_text = lp_text.replace(
        "    </div>\n  );\n};",
        """      <StudentAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onProfileUpdated={() => navigate('/dashboard')}
        initialName="Zaid Hasan"
      />
    </div>
  );
};"""
    )
    print("Added StudentAuthModal to LandingPage")

with open(lp_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(lp_text)
print("Updated LandingPage cleanly!")
