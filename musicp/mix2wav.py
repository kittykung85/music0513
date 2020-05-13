# -*- coding: utf-8 -*-
"""
Created on Fri Oct 25 21:13:27 2019

@author: Kitty
"""

from pydub import AudioSegment
from pydub.playback import play

audio1 = AudioSegment.from_file("./CMajor/CM_piano/CM_piano_3.wav") #your first audio file
audio2 = AudioSegment.from_file("./Drum/drum_2.wav") #your second audio file
audio3 = AudioSegment.from_file("./Drum/drum_1.wav") #your third audio file

mixed = audio1.overlay(audio2)          #combine , superimpose audio files
mixed1  = mixed.overlay(audio3)          #Further combine , superimpose audio files
#If you need to save mixed file
mixed1.export("mixedtry2.wav", format='wav') #export mixed  audio file
play(mixed1)                             #play mixed audio file
