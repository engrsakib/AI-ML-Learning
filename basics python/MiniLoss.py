N = int(input())
target = float(input())
total = 0.0

for _ in range(N):
    total += float(input())

average = total / N

if average <= target:
    print("PASS")
else:
    print("RETRY")