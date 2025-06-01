def load_data(file_path):
    # Function to load data from a given file path
    import pandas as pd
    data = pd.read_csv(file_path)
    return data

def clean_data(data):
    # Function to clean the dataset
    data = data.dropna()  # Remove missing values
    data = data.reset_index(drop=True)  # Reset index after dropping
    return data

def transform_data(data):
    # Function to transform the dataset
    # Example transformation: normalize numerical features
    from sklearn.preprocessing import MinMaxScaler
    scaler = MinMaxScaler()
    numerical_cols = data.select_dtypes(include=['float64', 'int']).columns
    data[numerical_cols] = scaler.fit_transform(data[numerical_cols])
    return data

def split_data(data, target_column, test_size=0.2):
    # Function to split the dataset into features and target
    from sklearn.model_selection import train_test_split
    X = data.drop(columns=[target_column])
    y = data[target_column]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=42)
    return X_train, X_test, y_train, y_test