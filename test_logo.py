import subprocess

# Let us verify convert can render SVG to PNG
res = subprocess.run(["convert", "-background", "none", "assets/images/logo.svg", "/tmp/test.png"], capture_output=True, text=True)
print("Return code:", res.returncode)
if res.stderr:
    print("Stderr:", res.stderr)
else:
    print("Success converting SVG to PNG!")
