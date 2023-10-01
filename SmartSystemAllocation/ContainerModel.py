# Measurement in Meter

class Container(object):
    """
    Creates a Container object. Classes models inherit from it.
    """
    def __init__(self):
        self.Container_id = id(self)

   

class Cmodel1(Container):
    
    def __init__(self, id, weight, loadingsequence, datetime):
        self.id = id
        self.width = 1
        self.length = 1
        self.height = 1
        self.weight = weight
        self.loadingsequence = loadingsequence
        self.datetime = datetime

    def get_width(self):
        return self.width
    
    def get_length(self):
        return self.length
        
    def get_height(self):
        return self.height
    
    def get_weight(self):
        return self.weight
    
    def get_loadingsequence(self):
        return self.loadingsequence
    
    def get_id(self):
        return self.id

    def get_date(self):
        return self.datetime.date()

class Cmodel2(Container):

    def __init__(self, id, weight, loadingsequence, datetime):
        self.id = id
        self.width = 1
        self.length = 1
        self.height = 3
        self.weight = weight
        self.loadingsequence = loadingsequence
        self.datetime = datetime

    def get_width(self):
        return self.width
    
    def get_length(self):
        return self.length

    def get_height(self):
        return self.height
    
    def get_weight(self):
        return self.weight
    
    def get_loadingsequence(self):
        return self.loadingsequence
    
    def get_id(self):
        return self.id

