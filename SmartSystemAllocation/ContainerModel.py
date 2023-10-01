# Measurement in Meter

class Container(object):
    """
    Creates a Container object. Classes models inherit from it.
    """
    def __init__(self):
        self.Container_id = id(self)

   

class Cmodel1(Container):
    
    def __init__(self, weight, loadingsequence):
        self.Container_id = id(self)
        self.width = 3
        self.lenght = 6
        self.height = 3
        self.weight = weight
        self.loadingsequence = loadingsequence

    def get_width(self):
        return self.width
    
    def get_lenght(self):
        return self.lenght
        
    def get_height(self):
        return self.height
    
    def get_weight(self):
        return self.weight
    
    def get_loadingsequence(self):
        return self.loadingsequence


class Cmodel2(Container):

    def __init__(self, weight, loadingsequence):
        self.Container_id = id(self)
        self.width = 3
        self.lenght = 12
        self.height = 4
        self.weight = weight
        self.loadingsequence = loadingsequence

    def get_width(self):
        return self.width
    
    def get_lenght(self):
        return self.lenght

    def get_height(self):
        return self.height
    
    def get_weight(self):
        return self.weight
    
    def get_loadingsequence(self):
        return self.loadingsequence


