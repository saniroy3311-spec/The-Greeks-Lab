import os
import sys
import pandas as pd

# Mock the model loading to prevent downloading 100MB model on local machine
sys.modules['model'] = type('MockModel', (object,), {
    'Kronos': type('K', (object,), {'from_pretrained': lambda *a, **k: None}),
    'KronosTokenizer': type('KT', (object,), {'from_pretrained': lambda *a, **k: None}),
    'KronosPredictor': type('KP', (object,), {'__init__': lambda *a, **kw: None})
})

# Import fetch_candles or copy the logic
def test():
    # Let's inspect how yfinance stores dates
    import yfinance as yf
    df = yf.download("^NSEI", period="5d", interval="5m", progress=False)
    print("Columns:", df.columns)
    print("Index datatype:", type(df.index))
    print("First few index values:")
    print(df.index[:3])
    
    # Check timestamp representation
    t0 = df.index[0]
    print("t0:", t0)
    print("t0 timestamp():", t0.timestamp())
    print("t0 value (nanoseconds):", t0.value)

if __name__ == '__main__':
    test()
