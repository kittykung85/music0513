# -*- coding: utf-8 -*-
"""
Created on Fri Oct 25 17:42:27 2019

@author: Kitty
"""

import wave
import pysynth as ps

t1 = input("your music generator: ")
t2 = input("your music generator: ")
t3 = input("your music generator: ")
t4 = input("your music generator: ")



from pydub import AudioSegment
t1 = AudioSegment.from_wav("./CMajor/CM_piano/CM_piano_1.wav")
t2 = AudioSegment.from_wav("./CMajor/CM_piano/CM_piano_2.wav")
t3 = AudioSegment.from_wav("./CMajor/CM_piano/CM_piano_3.wav")
t4 = AudioSegment.from_wav("./CMajor/CM_piano/CM_piano_4.wav")

combined_sounds = t1 + t2 + t3 + t4
combined_sounds.export("merge.wav", format="wav")



#"./CMajor/piano/piano_1.wav"
#"./CMajor/piano/piano_2.wav"
#"./CMajor/piano/piano_3.wav"

'''
infiles = [t1+".wav",t2+".wav"]
outfile = "sound.wav"

data= []
for infile in infiles:
    w = wave.open(infile, 'rb')
    data.append( [w.getparams(), w.readframes(w.getnframes())] )
    w.close()

output = wave.open(outfile, 'wb')
output.setparams(data[0][0])
output.writeframes(data[0][1])
output.writeframes(data[1][1])
output.close()
'''

