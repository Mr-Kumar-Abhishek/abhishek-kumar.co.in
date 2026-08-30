# COCOMO Price Calculation for the Entire Project

This file calculates the development cost of this entire repository (including all the books code) using the Constructive Cost Model (COCOMO).
We evaluate the price across all three Basic COCOMO modes: Organic, Semi-detached, and Embedded.

## 1. Project Statistics
- **Total Lines of Code (LOC):** 226,371
- **Kilo Lines of Code (KLOC):** 226.371
- **Included file types:** HTML, CSS, JS, Python, Markdown, JSON
- **Assumed Salary:** $5,000 / Person-Month

## 2. COCOMO Formulas
- **Effort (E):** `E = a * (KLOC)^b` in Person-Months (PM)
- **Time (D):** `D = c * (E)^d` in Months
- **Total Price:** `E * Salary`

### Constants Table
| Mode | a | b | c | d |
|---|---|---|---|---|
| Organic | 2.4 | 1.05 | 2.5 | 0.38 |
| Semi-Detached | 3.0 | 1.12 | 2.5 | 0.35 |
| Embedded | 3.6 | 1.20 | 2.5 | 0.32 |

## 3. Calculations

### Organic Mode
- **Effort (E):** `2.4 * (226.371)^1.05` ≈ **712.48 PM**
- **Time (D):** `2.5 * (712.48)^0.38` ≈ **30.34 Months**
- **Price:** `712.48 PM * $5,000` = **$3,562,400**

### Semi-Detached Mode
- **Effort (E):** `3.0 * (226.371)^1.12` ≈ **1,301.73 PM**
- **Time (D):** `2.5 * (1,301.73)^0.35` ≈ **30.76 Months**
- **Price:** `1,301.73 PM * $5,000` = **$6,508,650**

### Embedded Mode
- **Effort (E):** `3.6 * (226.371)^1.20` ≈ **2,410.39 PM**
- **Time (D):** `2.5 * (2,410.39)^0.32` ≈ **30.21 Months**
- **Price:** `2,410.39 PM * $5,000` = **$12,051,950**

## 4. Conclusion
For a large codebase of this size (226.37 KLOC), the difference in cost between modes becomes massive due to exponential scaling. A strictly embedded/real-time development environment would cost nearly three times as much as an organic, in-house development model.
