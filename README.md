# Playwright + TypeScript E2E Framework

Profesjonalny framework do testów end-to-end aplikacji **SauceDemo** zbudowany z użyciem **Playwright** i **TypeScript**.

![Playwright](https://img.shields.io/badge/Playwright-2CA5E0?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)

## ✨ Główne cechy

- Pełny **Page Object Model (POM)**
- Custom fixtures (autoryzacja)
- Zarządzanie danymi testowymi
- Testy podzielone na kategorie: Smoke, E2E, Regression, API
- Data-driven testing
- Allure reporting
- Gotowy do CI/CD (GitHub Actions)

## 📁 Struktura projektu

```bash
├── pages/                    # Page Object Models
├── tests/
│   ├── smoke/                # Szybkie testy podstawowe
│   ├── e2e/                  # Pełne scenariusze użytkownika
│   ├── regression/           # Testy regresji i negatywne
│   └── api/                  # Testy API
├── fixtures/                 # Custom fixtures
├── test-data/                # Dane testowe
├── playwright.config.ts
└── README.md