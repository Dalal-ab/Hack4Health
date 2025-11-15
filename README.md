# Surgery Duration Prediction System

A machine learning project that predicts operating room surgery durations using Random Forest regression. This tool helps healthcare facilities optimize OR scheduling by accurately estimating surgery times based on patient characteristics, procedure details, and medical staff assignments.

## Features

- **Predictive Model**: Uses Random Forest Regressor to predict surgery duration with high accuracy
- **Comprehensive Feature Engineering**: Considers multiple factors including:
  - Patient demographics (age, BMI, hemoglobin levels)
  - Medical comorbidities (hypertension, diabetes, COPD, etc.)
  - Surgery details (procedure type, anaesthesia type)
  - Staff assignments (surgeon, number of nurses)
  - ASA physical status rating
- **Interactive Prediction Interface**: User-friendly command-line interface for making predictions
- **Model Performance Metrics**: Displays MAE, RMSE, and R² scores
- **Feature Importance Analysis**: Identifies which factors most影響 surgery duration

## Dataset Requirements

The project expects a CSV file named `surgery_dataset_1000_with_correlations.csv` with the following columns:
- `Age`: Patient age (18-95)
- `BMI`: Body Mass Index (16.0-50.0)
- `Hemoglobin_Level_g/dL`: Hemoglobin levels (8.0-18.0)
- `ASA_Rating`: ASA physical status classification (1-5)
- `Surgeon`: Name of the surgeon
- `Procedure`: Type of surgical procedure
- `Anaesthesia_Type`: Type of anaesthesia used
- `Nurses`: Comma-separated list of nurses assigned
- `Medical_Comorbidities`: Semicolon-separated list of conditions
- `Surgery_Duration_Minutes`: Actual surgery duration (target variable)

## Installation

### Prerequisites
- Python 3.9 or higher
- pip package manager

### Setup Instructions

 **Create a virtual environment**
   ```bash
   python3 -m venv .venv
   ```

 **Activate the virtual environment**
   ```bash
   source .venv/bin/activate
   ```
   
   Note: On Windows, use `.venv\Scripts\activate`


5. **Install required packages**
   ```bash
   pip install numpy
   pip install pandas
   pip install scikit-learn
   ```

## Usage

1. **Ensure your dataset is in the project directory**
   ```
   surgery_dataset_1000_with_correlations.csv
   ```

2. **Run the prediction script**
   ```bash
   python OR_predicting_ML.py
   ```

3. **Follow the interactive prompts**
   - Select surgeon (by number or name)
   - Select procedure type
   - Select anaesthesia type
   - Enter number of nurses
   - Input patient demographics
   - Indicate presence of medical comorbidities

4. **View the prediction**
   The system will display the predicted surgery duration in both minutes and hours.

## Model Performance

The Random Forest model is configured with:
- 200 estimators
- Maximum depth of 20
- Optimized for accuracy and interpretability

Expected performance metrics (may vary based on your dataset):
- Mean Absolute Error: ~X minutes
- Root Mean Squared Error: ~X minutes
- R² Score: ~X.XX


## Contributing

This project was developed for [Hack4Health]. For questions or contributions, please contact the development team.
