# -*- coding: utf-8 -*-
"""
Created on Wed Oct  9 23:46:32 2019

@author: Kitty
"""

import pysynth as ps

test = (('c', 4),('e', 4), ('e', 4), ('g', 4),
		('c5', -2), ('e6', 8), ('d#6', 2))
ps.make_wav(test, fn = "test.wav")


import pysynth_b as psb # a, b, e, and s variants available

'''(note, duration)
Note name (a to g), then optionally a '#' for sharp or
'b' for flat, then optionally the octave (defaults to 4).
An asterisk at the end means to play the note a little 
louder.  Duration: 4 is a quarter note, -4 is a dotted 
quarter note, etc.'''

song = (
  ('c', 4), ('c*', 4), ('eb', 4), 
  ('g#', 4),  ('g*', 2), ('g5', 4),
  ('g5*', 4), ('r', 4), ('e5', 16),
  ('f5', 16),  ('e5', 16),  ('d5', 16),
  ('e5*', 4) 
)

# Beats per minute (bpm) is really quarters per minute here
psb.make_wav(test+song, fn = "tests.wav", leg_stac = .7, bpm = 180)

song3 = (
  ('bb', 8),
  ('g5*', 2), ('f5', 8), ('g5', 8), ('f5', -4), ('eb5', 4), ('bb', 8),
  ('g5*', 4), ('c5', 8), ('c6', 4), ('g5', 8), ('bb5', -4), ('ab5', 4), ('g5', 8),
  ('f5*', -4), ('g5', 4), ('d5', 8), ('eb5', -4), ('c5', -4),
  ('bb*', 8), ('d6', 8), ('c6', 8), ('bb5', 16), ('ab5', 16), ('g5', 16), ('ab5', 16), ('c5', 16), ('d5', 16), ('eb5', -4),
)
ps.make_wav(song3, fn = "s1.wav")

