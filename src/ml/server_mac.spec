# -*- mode: python ; coding: utf-8 -*-
from PyInstaller.utils.hooks import collect_submodules, collect_data_files
import os

block_cipher = None
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
        *collect_submodules('matplotlib'),
        *collect_submodules('numpy'),
        *collect_submodules('pandas'),
        *collect_submodules('scipy'),
        'ModelFactory',  
    ],
    hookspath=[],
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
)
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],  # Remove a.binaries and a.datas from here
    exclude_binaries=True,  # This is the key change
    name='server',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=False,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
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
    upx=False,
    upx_exclude=[],
    name='server',
)