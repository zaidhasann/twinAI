document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('http://localhost:8000/api/students/std_01/placement-readiness');
    if (res.ok) {
      const data = await res.json();
      document.getElementById('readiness-val').innerText = `${data.score}% (${data.status})`;
    }
  } catch (e) {
    console.log('TwinAI backend offline or using default view');
  }
});
