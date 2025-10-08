brightness, threshold = map(float, input().split())

if brightness >= threshold:
    print("ON")
else:
    print("OFF")