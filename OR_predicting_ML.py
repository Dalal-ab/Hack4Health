import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import warnings
warnings.filterwarnings('ignore')

# Load the data
print("Loading surgery data...")
df = pd.read_csv('/Users/huzaifashafiq/Downloads/surgery_dataset_1000_with_correlations.csv')

print(f"Dataset loaded successfully! Total records: {len(df)}")
print(f"Columns: {df.columns.tolist()}\n")

# Data preprocessing
print("Preprocessing data...")

# Create a feature for number of nurses
df['Num_Nurses'] = df['Nurses'].apply(lambda x: len(x.split(', ')))

# Handle Medical_Comorbidities - create binary features for each condition
comorbidity_list = ['Hypertension', 'Diabetes', 'COPD', 'Heart Disease', 
                    'Chronic Kidney Disease', 'Obesity', 'Coagulopathy']

for condition in comorbidity_list:
    df[f'Has_{condition.replace(" ", "_")}'] = df['Medical_Comorbidities'].apply(
        lambda x: 1 if condition in str(x) else 0
    )

# Count total number of comorbidities
df['Num_Comorbidities'] = df['Medical_Comorbidities'].apply(
    lambda x: 0 if x == 'None' else len(str(x).split(';'))
)

# Encode categorical variables
label_encoders = {}
categorical_columns = ['Surgeon', 'Anaesthesia_Type', 'Procedure']

for col in categorical_columns:
    le = LabelEncoder()
    df[f'{col}_Encoded'] = le.fit_transform(df[col])
    label_encoders[col] = le

# Select features for the model
feature_columns = [
    'Age', 'BMI', 'Hemoglobin_Level_g/dL', 'ASA_Rating',
    'Surgeon_Encoded', 'Anaesthesia_Type_Encoded', 'Procedure_Encoded',
    'Num_Nurses', 'Num_Comorbidities'
] + [f'Has_{condition.replace(" ", "_")}' for condition in comorbidity_list]

X = df[feature_columns]
y = df['Surgery_Duration_Minutes']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train Random Forest model
print("Training Random Forest model...")
rf_model = RandomForestRegressor(
    n_estimators=200,
    max_depth=20,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1
)

rf_model.fit(X_train, y_train)

# Evaluate the model
y_pred = rf_model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print("\n" + "="*60)
print("MODEL PERFORMANCE METRICS")
print("="*60)
print(f"Mean Absolute Error: {mae:.2f} minutes")
print(f"Root Mean Squared Error: {rmse:.2f} minutes")
print(f"R² Score: {r2:.4f}")
print("="*60 + "\n")

# Feature importance
feature_importance = pd.DataFrame({
    'Feature': feature_columns,
    'Importance': rf_model.feature_importances_
}).sort_values('Importance', ascending=False)

print("TOP 10 MOST IMPORTANT FEATURES:")
print(feature_importance.head(10).to_string(index=False))
print("\n")

# Interactive prediction function
def predict_surgery_duration():
    print("\n" + "="*60)
    print("SURGERY DURATION PREDICTION")
    print("="*60 + "\n")
    
    # Available options
    surgeons = sorted(df['Surgeon'].unique())
    procedures = sorted(df['Procedure'].unique())
    anaesthesia_types = sorted(df['Anaesthesia_Type'].unique())
    nurses = sorted(set([nurse.strip() for nurses_str in df['Nurses'] 
                        for nurse in nurses_str.split(', ')]))
    
    print("AVAILABLE OPTIONS:")
    print("\nSurgeons:")
    for i, surgeon in enumerate(surgeons, 1):
        print(f"  {i}. {surgeon}")
    
    print("\nProcedures:")
    for i, proc in enumerate(procedures, 1):
        print(f"  {i}. {proc}")
    
    print("\nAnaesthesia Types:")
    for i, atype in enumerate(anaesthesia_types, 1):
        print(f"  {i}. {atype}")
    
    print("\n" + "-"*60)
    print("ENTER PATIENT AND SURGERY DETAILS:")
    print("-"*60 + "\n")
    
    # Get user input with flexible input handling
    surgeon_input = input(f"Select Surgeon (enter number 1-{len(surgeons)} or name): ")
    if surgeon_input.isdigit():
        surgeon = surgeons[int(surgeon_input) - 1]
    else:
        surgeon = surgeon_input if surgeon_input in surgeons else surgeons[0]
    
    procedure_input = input(f"Select Procedure (enter number 1-{len(procedures)} or name): ")
    if procedure_input.isdigit():
        procedure = procedures[int(procedure_input) - 1]
    else:
        procedure = procedure_input if procedure_input in procedures else procedures[0]
    
    anaesthesia_input = input(f"Select Anaesthesia Type (enter number 1-{len(anaesthesia_types)} or name): ")
    if anaesthesia_input.isdigit():
        anaesthesia = anaesthesia_types[int(anaesthesia_input) - 1]
    else:
        anaesthesia = anaesthesia_input if anaesthesia_input in anaesthesia_types else anaesthesia_types[0]
    
    num_nurses = int(input("Number of Nurses (1-10): "))
    
    age = float(input("Patient Age (18-95): "))
    bmi = float(input("Patient BMI (16.0-50.0): "))
    hemoglobin = float(input("Hemoglobin Level (8.0-18.0 g/dL): "))
    asa_rating = int(input("ASA Rating (1-5): "))
    
    print("\nMedical Comorbidities (enter 1 for Yes, 0 for No):")
    comorbidities = {}
    for condition in comorbidity_list:
        response = int(input(f"  {condition}: "))
        comorbidities[f'Has_{condition.replace(" ", "_")}'] = response
    
    num_comorbidities = sum(comorbidities.values())
    
    # Prepare input for prediction
    input_data = {
        'Age': age,
        'BMI': bmi,
        'Hemoglobin_Level_g/dL': hemoglobin,
        'ASA_Rating': asa_rating,
        'Surgeon_Encoded': label_encoders['Surgeon'].transform([surgeon])[0],
        'Anaesthesia_Type_Encoded': label_encoders['Anaesthesia_Type'].transform([anaesthesia])[0],
        'Procedure_Encoded': label_encoders['Procedure'].transform([procedure])[0],
        'Num_Nurses': num_nurses,
        'Num_Comorbidities': num_comorbidities
    }
    
    # Add comorbidity features
    input_data.update(comorbidities)
    
    # Create DataFrame with correct column order
    input_df = pd.DataFrame([input_data])[feature_columns]
    
    # Make prediction
    predicted_duration = rf_model.predict(input_df)[0]
    
    # Display results
    print("\n" + "="*60)
    print("PREDICTION RESULTS")
    print("="*60)
    print(f"\nSurgeon: {surgeon}")
    print(f"Procedure: {procedure}")
    print(f"Anaesthesia: {anaesthesia}")
    print(f"Number of Nurses: {num_nurses}")
    print(f"Patient Age: {age} years")
    print(f"Patient BMI: {bmi}")
    print(f"Hemoglobin: {hemoglobin} g/dL")
    print(f"ASA Rating: {asa_rating}")
    print(f"Number of Comorbidities: {num_comorbidities}")
    print("\n" + "-"*60)
    print(f"PREDICTED SURGERY DURATION: {predicted_duration:.0f} minutes")
    print(f"ESTIMATED TIME: {predicted_duration/60:.1f} hours")
    print("="*60 + "\n")
    
    return predicted_duration

# Run interactive prediction
if __name__ == "__main__":
    while True:
        predict_surgery_duration()
        
        continue_pred = input("Would you like to make another prediction? (yes/no): ").lower()
        if continue_pred not in ['yes', 'y']:
            print("\nThank you for using the Surgery Duration Predictor!")
            break