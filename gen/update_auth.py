import os

p = r'C:\Users\ASUS\.gemini\antigravity\scratch\twinAI\src\components\TopNavbar.tsx'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('\r\n', '\n')

# Add import
if 'StudentAuthModal' not in text:
    text = text.replace(
        "import { useToast } from './ToastProvider';",
        "import { useToast } from './ToastProvider';\nimport { StudentAuthModal } from './StudentAuthModal';"
    )

# Add state
if 'showAuthModal' not in text:
    text = text.replace(
        "const [profile, setProfile] = useState<StudentProfile | null>(null);",
        "const [profile, setProfile] = useState<StudentProfile | null>(null);\n  const [showAuthModal, setShowAuthModal] = useState(false);"
    )

# Replace Switch button
old_switch = """        <div className="pt-1 border-t border-white/[0.08]">
          <button
            onClick={() => {
              setShowProfileMenu(false);
              showToast('Simulation: Switched to demo preview mode', undefined, 'default');
            }}
            className="w-full text-left px-3 py-2 text-xs text-gray-400 hover:text-gray-200 rounded-lg hover:bg-white/[0.05] transition-colors"
          >
            Switch Student Profile
          </button>
        </div>"""

new_switch = """        <div className="pt-1 border-t border-white/[0.08]">
          <button
            onClick={() => {
              setShowProfileMenu(false);
              setShowAuthModal(true);
            }}
            className="w-full text-left px-3 py-2 text-xs text-[#8B6FC7] hover:text-white font-semibold rounded-lg hover:bg-white/[0.05] transition-colors flex items-center justify-between"
          >
            <span>Switch / Student Login</span>
            <span className="text-[10px] bg-[#8B6FC7]/20 px-1.5 py-0.5 rounded text-[#8B6FC7]">Edit</span>
          </button>
        </div>"""

if old_switch in text:
    text = text.replace(old_switch, new_switch)
    print("Replaced switch button")

# Add modal before header closes
if '<StudentAuthModal' not in text:
    text = text.replace(
        "</header>",
        """  <StudentAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onProfileUpdated={() => getStudentProfile().then(setProfile)}
        initialName={profile?.name || ''}
      />
    </header>"""
    )
    print("Added StudentAuthModal JSX")

with open(p, 'w', encoding='utf-8', newline='\n') as f:
    f.write(text)

print("TopNavbar updated successfully!")
