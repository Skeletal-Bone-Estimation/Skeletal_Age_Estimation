# server.spec

# -*- mode: python ; coding: utf-8 -*-

from PyInstaller.utils.hooks import collect_submodules, collect_data_files
import os

# Add your source path (where your modules like LinearRegression.py exist)
#source_dir = os.path.abspath('src/ml')

a = Analysis(
    ['server.py'],  # Entry point
    pathex=['src/ml'],
    binaries=[],
    datas=collect_data_files('matplotlib') + collect_data_files('seaborn'),
    hiddenimports=[
        *collect_submodules('flask'),
        *collect_submodules('flask_cors'),
        *collect_submodules('sklearn'),
        *collect_submodules('statsmodels'),
    ],
    hookspath=[],
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
)

pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='server',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,  # Set to False for GUI mode (no console window)
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    name='server'
)
