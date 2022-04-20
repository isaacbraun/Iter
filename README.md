# Iter
A METAR Browsing &amp; Flight Charting Mobile Application


# Flight Path Comparison Info
- Temp:
    - Points: 10
    - Above 35/40 C Not Good
- Dewpoint:
    - Points: 10
    - High not good, close to temp not good. Most thunderstorms happen above 21 C
- Wind Speed:
    - Points: 20
    - Lower better, gust lower also
- Visibility:
    - Points: 15
    - Higher better, more important at origin and destination
- Altimeter & Pressure:
    - Points: 
    - Might have to include with consideration of station elevation
- Sky Cover:
    - Points: 10
    - CLR > SKC > FEW > SCT > BKN > OVC > OVX
    - Miss should not be considered?
- Ceiling:
    - Points: 15
    - IF provided - higher is better
- Flight Category:
    - Points: 30
    - VFR > MVFR > IFR > LIFR
- WX String:
    - Points: 20
    - IF Provided - create scale from pdf

- Possible Grading scale:
    - Assign point values to different criteria, greater in some areas.
    - Find grade by (points achieved / points possible) = 0.XXX value
    - Each Station gets a grade, averaged and compared. Higher value is better.