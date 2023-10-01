# Measurement in Meter

class quay(object):
    """
    Creates a quay object. Classes models inherit from it.
    """
    def __init__(self):
        self.quay_id = id(self)

   

class Qmodel1(quay):
    
    def __init__(self):
        self.quay_id = id(self)
        self.width = 100
        self.length = 100

    def get_width(self):
        return self.width
    
    def get_length(self):
        return self.length


