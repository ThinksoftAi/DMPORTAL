import subprocess

svg_test = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" height="200">
  <rect x="10" y="10" width="100" height="100" fill="red" />
</svg>"""

with open("/tmp/t.svg", "w") as f:
    f.write(svg_test)

res = subprocess.run(["rsvg-convert", "-o", "/tmp/t.png", "/tmp/t.svg"], capture_output=True, text=True)
print("Stdout:", res.stdout)
print("Stderr:", res.stderr)
