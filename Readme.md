```javascript
data = {
  Comment: 61761,
  Summary: 35706,
  Commit: 7855,
  Issue: 500,
  Project: 44,
  Sprint: 39,
  User: 12
}
```
 (Array.includes -> object)\
 | func         | perfomance enh      |
 |--------------|---------------------|
 | getComments  | 3500 ms -> 52.57 ms |
 | getSummaries | 296 ms -> 56.4 ms   |
 |              |                     |

Formatter as stand alone object
activitySlide 85ms -> 22.7ms

JSON parsing of big file(35M) takes 478 ms
